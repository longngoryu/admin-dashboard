export type RequestDataSignin = {
  email: string;
  password: string;
  returnSecureToken?: boolean;
};

export type ResponseDataSignin = {
  displayName: string;
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  registered: boolean;
  refreshToken?: string;
  expiresIn?: number;
};
