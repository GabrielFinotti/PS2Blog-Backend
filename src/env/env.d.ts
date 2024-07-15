declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_URL: string;
    DB_NAME: string;
    DB_URL: string;
    PORT: number;
    SECRET_KEY: string;
    MOBY_API_KEY: string;
  }
}
