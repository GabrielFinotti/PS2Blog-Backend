declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    SECRET_KEY: string;
    CLIENT_URL: string;
    DB_URL: string;
    DB_NAME: string;
  }
}
