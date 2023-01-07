function decodeJWT(t: string) {
  const token: {
    raw?: string;
    header?: { alg: string; typ: string };
    payload?: { exp: number; iat: number; username: string };
  } = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split(".")[0]));
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token;
}
export default decodeJWT;
