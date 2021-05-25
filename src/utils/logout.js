export const logout = (setIsLoggedIn) => {
  localStorage.token = "";
  setIsLoggedIn(false);
};
