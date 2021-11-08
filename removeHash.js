const removeHash = () => {
  setTimeout(() => {
    // call removeFunction function after set timeout
    removeFunction();
  }, 300);
};

const removeFunction = () => {
  history.replaceState(
    "",
    document.title,
    window.location.origin + window.location.pathname
  );
};

export default removeHash;
