import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { __ } from "@wordpress/i18n";

const appNavs = [
  {
    key: 0,
    path: "/app/maps",
    label: "Maps",
    icon: "world"
  },
  {
    key: 1,
    path: "/app/features",
    label: "Features",
    icon: "location"
  }
];

const systemNavs = [
  {
    key: 2,
    divider: true
  },
  {
    key: 3,
    label: __("sign out", "geolonia-dashboard"),
    handler: ({ auth, history }) => {
      auth.signout();
      history.replace(`/app/sign-in/`);
    },
    icon: "sign-out"
  },
  {
    key: 4,
    label: ({ auth }) => auth.userData.username,
    path: "/app/profile/",
    icon: "user"
  }
];

export const SideBar = props => {
  // eslint-disable-next-line
  const renderItem = props => ({
    key,
    divider,
    label,
    path,
    handler,
    icon
  }) => {
    if (divider) {
      return <li key={key} className={"uk-nav-divider"}></li>;
    } else {
      return (
        <li key={key}>
          <Link
            to={path || "#"}
            onClick={
              "function" === typeof handler ? () => handler(props) : void 0
            }
            style={{ color: "white" }}
          >
            {icon && (
              <span
                className={"uk-margin-small-right"}
                uk-icon={`icon: ${icon}`}
              ></span>
            )}
            {"function" === typeof label ? label(props) : label}
          </Link>
        </li>
      );
    }
  };

  return (
    <div className={"bar-wrap uk-flex uk-flex-column uk-flex-between"}>
      <ul className={"uk-nav-default uk-nav-parent-icon"} uk-nav={"true"}>
        <li className={"uk-active"}>{"Apps"}</li>
        {appNavs.map(renderItem(props))}
      </ul>
      <ul className={"uk-nav-default uk-nav-parent-icon"} uk-nav={"true"}>
        {systemNavs.map(renderItem(props))}
      </ul>
    </div>
  );
};

SideBar.propTypes = {
  auth: PropTypes.any
};

export default SideBar;