declare namespace NodeJS {
  export interface ProcessEnv {
    readonly DOMAIN: string;
    readonly URL_SIGNIN: string;
    readonly URL_SIGNUP: string;
    readonly AUTH_SECRET: string;
  }
}
