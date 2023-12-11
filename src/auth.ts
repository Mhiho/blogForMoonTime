export const sessionStatus = async () => {
  const redisToken = await fetch('/api/token');
  return (await redisToken.json()) === getToken();
};

export const isBrowser = () => typeof window != 'undefined';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('token');
    return token;
  }
};

//
export const setToken = (token: string) => {
  if (typeof window !== 'undefined')
    window.localStorage.setItem('token', token);
};
//
// export const isLoggedIn = async () => {
//   const dbToken = await redisToken;

//   const token = getToken();
//   if (dbToken === token) return !!token;
// };
