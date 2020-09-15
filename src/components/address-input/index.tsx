import React from "react";

// components
import { Link } from "@material-ui/core";
import Title from "../custom/Title";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Interweave from "interweave";
import Code from "../custom/Code";
import AddressInputSample from "./sample";

// libs
import { copyToClipBoard } from "../../lib/clipboard";
import { sprintf, __ } from "@wordpress/i18n";

// Redux
import { connect } from "react-redux";

type OwnProps = {};
type StateProps = {
  mapKeys: Geolonia.Key[];
  isReady: boolean;
};
type DispatchProps = {
  addKey: (teamId: string, key: Geolonia.Key) => void;
};
type Props = OwnProps & StateProps & DispatchProps;

const styleH3: React.CSSProperties = {
  marginTop: "1em"
};

const sidebarStyle: React.CSSProperties = {
  marginBottom: "2em",
  overflowWrap: "break-word"
};

const styleTextarea: React.CSSProperties = {
  width: "100%",
  color: "#555555",
  fontFamily: "monospace",
  resize: "none",
  height: "5rem",
  padding: "8px"
};

function AddressInput(props: Props) {
  // TODO: debug select できるようにする
  const [apiKey, setApiKey] = React.useState("aaaaa");

  const breadcrumbItems = [
    {
      title: __("Home"),
      href: "#/"
    },
    {
      title: __("Address Input API"),
      href: null
    }
  ];

  const { mapKeys, isReady } = props;
  const rows = mapKeys.map(key => {
    return {
      id: key.keyId,
      name: key.name,
      updated: key.createAt
        ? key.createAt.format("YYYY/MM/DD hh:mm:ss")
        : __("(No date)")
    };
  });

  const embedCode = sprintf(
    '<script type="text/javascript" src="%s/%s/embed-address?geolonia-api-key=%s"></script>',
    process.env.REACT_APP_API_BASE,
    process.env.REACT_APP_STAGE,
    apiKey
  );

  const htmlEmbedCode = `<div id="address"></div>`;

  return (
    <div>
      <Title breadcrumb={breadcrumbItems} title={__("Address Input API")}>
        {mapKeys.length === 0 ? (
          <p>
            {__("You need an API key to use Address Input API.")}{" "}
            <Link href={"#/api-keys"}>{"Get an API key."}</Link>
          </p>
        ) : (
          <p>
            <Link href={"#/api-keys"}>{"Manage API keys."}</Link>
          </p>
        )}
      </Title>

      <Grid item xs={12}>
        <Paper style={sidebarStyle}>
          <p>
            {__(
              "Address Input API is a form parts to enable easy address input."
            )}
          </p>
          <AddressInputSample></AddressInputSample>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper style={sidebarStyle}>
          <Typography component="h2" className="module-title">
            {__("Your API Key")}
          </Typography>
          <Code>{apiKey}</Code>
        </Paper>
        <Paper style={sidebarStyle}>
          <Typography component="h2" className="module-title">
            {__("Add the address input form to your site")}
          </Typography>
          <Typography component="h3" style={styleH3}>
            {__("Step 1")}
          </Typography>
          <p>
            <Interweave
              content={__(
                "Include the following code before closing tag of the <code>&lt;body /&gt;</code> in your HTML file."
              )}
            />
          </p>
          <textarea
            className="api-key-embed-code"
            style={styleTextarea}
            value={embedCode}
            readOnly={true}
          ></textarea>
          <p>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ width: "100%" }}
              onClick={() => copyToClipBoard(".api-key-embed-code")}
            >
              {__("Copy to Clipboard")}
            </Button>
          </p>
          <Typography component="h3" style={styleH3}>
            {__("Step 2")}
          </Typography>
          <p>
            {__(
              "Click following button and get HTML code where you want to place the map."
            )}
          </p>
          <textarea
            className="html-embed-code"
            style={styleTextarea}
            value={htmlEmbedCode}
            readOnly={true}
          ></textarea>
          <p>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ width: "100%" }}
              onClick={() => copyToClipBoard(".html-embed-code")}
            >
              {__("Copy to Clipboard")}
            </Button>
          </p>
        </Paper>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state: Geolonia.Redux.AppState): StateProps => {
  const selectedTeamIndex = state.team.selectedIndex;
  const { teamId } = state.team.data[selectedTeamIndex] || {
    teamId: "-- unexpected fallback when no team id found --"
  };
  if (!state.mapKey[teamId]) {
    return { mapKeys: [], isReady: state.authSupport.isReady };
  }
  const mapKeyObject = state.mapKey[teamId] || { data: [] };
  const mapKeys = mapKeyObject.data;
  return {
    mapKeys,
    isReady: state.authSupport.isReady
  };
};

export default connect(mapStateToProps)(AddressInput);
