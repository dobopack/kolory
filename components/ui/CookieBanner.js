import React from "react";

import classes from "./CookieBanner.module.css";

function CookieBanner({ checkCookie }) {
  const handleAccept = () => {
    checkCookie(true);

    localStorage.setItem("cookieBannerDisplayed", "true");
  };

  return (
    <div className={classes.container}>
      <div>Ta witryna używa plików cookies w celach statystycznych.</div>
      <button className={classes.acceptButton} onClick={handleAccept}>
        Ok
      </button>
    </div>
  );
}

export default CookieBanner;
