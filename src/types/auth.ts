export type RequestDataSignin = {
  email: string;
  password: string;
  returnSecureToken?: boolean;
};

export type ResponseDataSignin = {
  displayName: string;
  email: string;
  kind: string;
  localId: string;
  registered: boolean;
  refreshToken?: string;
  expiresIn?: number;
};

export type ResponseDataMe = {
  userId: string;
  name: string;
  email: string;
  authTime?: number;
  emailVerified?: boolean;
};
