import Cookies from "js-cookie";

export const JWT_TOKEN_COOKIE_NAME = "jwtToken";

export const getAuthCookie = () => Cookies.get(JWT_TOKEN_COOKIE_NAME);

export const setAuthCookie = (value: string) =>
  Cookies.set(JWT_TOKEN_COOKIE_NAME, value);

export const deleteAuthCookie = () => Cookies.remove(JWT_TOKEN_COOKIE_NAME);
