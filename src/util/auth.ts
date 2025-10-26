export const isAuthenticated = (): boolean => {
  const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('user='));

  if (!userCookie) return false;

  try {
    const userValue = decodeURIComponent(userCookie.split('=')[1]);
    const userData = JSON.parse(userValue);

    // check if token hasn't expired
    if (userData.tokenExp) {
      const expiration = new Date(userData.tokenExp);
      return expiration > new Date();
    }
  } catch (e) {
    return false;
  }

  return false;
};
