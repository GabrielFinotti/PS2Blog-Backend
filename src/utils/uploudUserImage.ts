import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseConfig from "../db/firebaseConfig";
import mongoose from "mongoose";
import { userModel } from "../models/userModel";

export default async (
  username: string,
  id: string,
  file: Express.Multer.File
) => {
  try {
    if (!username) {
      return { message: "Username cannot be empty!!", status: 400 };
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: "Invalid id!", status: 400 };
    }

    const user = await userModel.findById(id);

    if (!user) return { message: "User not found!", status: 404 };

    let url!: string;
    const allowMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];

    if (!allowMimeTypes.includes(file.mimetype)) {
      return { message: "File Invalid", status: 400 };
    }

    const fileType = file.mimetype.split("/")[1];
    file.originalname = `${id}-${username}-${user.email}.${fileType}`;

    const metadata = {
      name: file.originalname,
      size: file.size,
      contentType: file.mimetype,
    };

    const app = await firebaseConfig();
    const storage = getStorage(app);

    const userImagePath = ref(storage, `${id}/Profile/${username}`);

    const uploadTask = uploadBytesResumable(
      userImagePath,
      file.buffer,
      metadata
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Upload is ${Math.round(progress)}% done`);
      },
      (error) => {
        console.log(`Uploud error: ${error}`);
        throw error;
      },
      async () => {
        url = await getDownloadURL(uploadTask.snapshot.ref);

        await user.updateOne({ image: url });
      }
    );

    const result = await new Promise<boolean>((resolve, reject) => {
      uploadTask.then(() => {
        resolve(true);
      }, reject);
    });

    if (!result) return { message: `Uploud image error!`, status: 502 };

    return { message: "Upload image success!", status: 201 };
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);
    return { message: "Internal Error!", status: 500 };
  }
};
