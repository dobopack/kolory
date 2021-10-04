const removeHash = () => {
  setTimeout(() => {
    // call removeFunction function after set timeout
    removeFunction();
  }, 100);
};

const removeFunction = () => {
  history.replaceState(
    "",
    document.title,
    window.location.origin + window.location.pathname + window.location.search
  );
};

export default removeHash;
