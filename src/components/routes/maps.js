import React from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import { Link } from "react-router-dom";
import Modal from "../modal";
import { __, _n, sprintf } from "@wordpress/i18n";

export class DashboardRoute extends React.PureComponent {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    auth: PropTypes.any,
    history: PropTypes.any
  };

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      userKeys: [],
      openedUserKey: false,
      error: false,
      requesting: false,
      nextUserKeyProps: {},
      modalOpen: false
    };
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (this.props.auth.userData) {
      this.listKeys();
    }
  }

  listKeys = async () => {
    this.props.auth.API.listKeys()
      .then(userKeys => this.setState({ requesting: false, userKeys }))
      .catch(err =>
        // console.error(err) ||
        this.setState({ userKeys: [], error: true, requesting: false })
      );
  };

  /**
   * componentDidUpdate
   * @param  {object} prevProps prev props
   * @param  {object} prevState prev state
   * @param  {object} snapshot  snapshot
   * @return {void}
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.userHasRetrieved && this.props.auth.userHasRetrieved) {
      if (this.props.auth.userData) {
        this.listKeys();
      } else {
        this.props.history.push(`/app/sign-in`);
      }
    }
  }

  openModalClick = () => this.setState({ error: false, modalOpen: true });

  onCopyToClipboardClick = userKey => () => {
    const clipboard = document.getElementById("clipboard");
    clipboard.value = userKey;
    clipboard.select();
    document.execCommand("copy");
  };

  renderClipboard = () => (
    <input
      type={"text"}
      style={{ top: -9999, left: -9999, position: "absolute" }}
      value={""}
      readOnly
      id={"clipboard"}
    />
  );

  render() {
    const {
      auth: { userData }
    } = this.props;
    const { userKeys, error, requesting, modalOpen } = this.state;

    if (!userData) {
      return null;
    }

    return (
      <main
        className={
          "geolonia-app uk-container uk-container-medium uk-margin uk-padding-small"
        }
      >
        <ul className={"uk-breadcrumb"}>
          <li>
            <span>{__("maps", "geolonia-dashboard")}</span>
          </li>
        </ul>

        {error && (
          <div uk-alert={"true"} className={"uk-alert-danger"}>
            <p className={"uk-padding"}>
              {__("Request failed.", "geolonia-dashboard")}
            </p>
          </div>
        )}

        <div className={"uk-margin"}>
          <button
            className={"uk-button uk-button-default"}
            onClick={this.openModalClick}
            disabled={requesting}
          >
            <Spinner loading={requesting} />
            {__("generate map", "geolonia-dashboard")}
          </button>
        </div>

        {userKeys.length === 0 && (
          <p className={"uk-text"}>{__("No maps.", "geolonia-dashboard")}</p>
        )}

        {/* development */}
        <ul className={"uk-padding-remove"}>
          {userKeys.map(({ userKey, allowedOrigins, name, enabled }, index) => {
            const displayAllowedOrigins = [...(allowedOrigins || [])];
            const originsCount = displayAllowedOrigins.length;

            if (originsCount > 5) {
              displayAllowedOrigins.splice(5, originsCount - 5);
            }

            return (
              <Link
                to={`/app/maps/${userKey}`}
                className={"uk-link-toggle"}
                key={userKey}
              >
                <li
                  className={`uk-padding uk-flex uk-flex-middle uk-flex-between api-key-list api-key-list-${
                    index % 2 === 0 ? "even" : "odd"
                  }`}
                >
                  <div className={"uk-flex"}>
                    <span
                      style={{ width: 50 }}
                      className={`uk-margin-large-right uk-flex uk-flex-middle uk-flex-center ${
                        enabled
                          ? "api-key-item__enabled"
                          : "api-key-item__disabled"
                      }`}
                      uk-icon={`icon: ${enabled ? "check" : "close"}; ratio: 2`}
                      uk-tooltip={
                        enabled
                          ? __("enabled", "geolonia-dashboard")
                          : __("disabled", "geolonia-dashboard")
                      }
                    />
                    <div className={"uk-flex uk-flex-column"}>
                      <span className={"uk-text-bold uk-link-heading"}>
                        {name || "(no name)"}
                      </span>
                      <span>
                        {displayAllowedOrigins.map(origin => {
                          return (
                            <span
                              key={origin}
                              className={
                                "uk-label uk-label-default uk-text-lowercase uk-margin-small-right"
                              }
                              style={{
                                color: "#666",
                                background: "none",
                                border: "1px solid #666"
                              }}
                            >
                              {origin}
                            </span>
                          );
                        })}
                        {originsCount > 5 &&
                          sprintf(
                            _n(
                              "and other %s origin",
                              "and other %s origins",
                              originsCount - 5,
                              "geolonia-dashboard"
                            ),
                            originsCount - 5
                          )}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{ width: 50 }}
                    className={"uk-margin-small-right"}
                    uk-icon={"icon: chevron-right; ratio: 2"}
                  />
                </li>
              </Link>
            );
          })}
        </ul>

        <Modal
          open={modalOpen}
          close={() => this.setState({ modalOpen: false })}
          auth={this.props.auth}
          onMapCreated={data =>
            this.setState({ userKeys: [...this.state.userKeys, data] })
          }
        ></Modal>

        {this.renderClipboard()}
      </main>
    );
  }
}

export default DashboardRoute;