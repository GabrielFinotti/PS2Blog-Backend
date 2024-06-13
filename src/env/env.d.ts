declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    SECRET_KEY: string;
    CLIENT_URL: string;
    DB_URL: string;
    DB_NAME: string;
    FIREBASE_KEY: string;
    FIREBASE_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_BUCKET: string;
    FIREBASE_MESSAGE: string;
    FIREBASE_AP_ID: string;
  }
}
