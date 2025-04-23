import React from "react";
import logo from "../assets/logo_movepro.png";

function HeaderLogo() {
  return (
    <div className="absolute top-4 right-4">
      <img src={logo} alt="Logo MovePro" className="h-12" />
    </div>
  );
}

export default HeaderLogo;
