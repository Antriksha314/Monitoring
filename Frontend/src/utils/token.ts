import jwt_decode from "jwt-decode";

export const decodeToken = async (token: any) => {
    return await jwt_decode(token);
  };