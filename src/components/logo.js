import React from "react";

export const Logo = () => (
  <h1 className={"uk-card-title uk-text-center"}>
    <img
      src={__ENV__.PUBLIC_URL + "/images/logo.png"}
      alt={"TileCloud"}
      style={{ width: 245, minWidth: "50%" }}
    />
  </h1>
);

export default Logo;
