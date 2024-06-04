declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_URL: string;
    DB_NAME: string;
    SECRET_KEY: string;
  }
}
