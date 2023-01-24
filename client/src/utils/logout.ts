const logout = () => {
  window.localStorage.clear();
  window.location.replace(window.location.origin);
};

export default logout;
