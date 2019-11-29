import React from "react";

import Table from "../custom/Table";
import AddNew from "../custom/AddNew";
import Title from "../custom/Title";

import { __ } from "@wordpress/i18n";
import { connect } from "react-redux";

// api
import createKey from "../../api/keys/create";

// types
import { AppState, Key, Session } from "../../types";

// redux
import Redux from "redux";
import { createActions as createMapKeyActions } from "../../redux/actions/map-key";

type OwnProps = {};
type StateProps = {
  session: Session;
  mapKeys: Key[];
  error: boolean;
  teamId: string;
};
type DispatchProps = {
  addKey: (teamId: string, key: Key) => void;
};
type Props = OwnProps & StateProps & DispatchProps;

function Content(props: Props) {
  const [message, setMessage] = React.useState("");

  const breadcrumbItems = [
    {
      title: "Home",
      href: "#/"
    },
    {
      title: __("Maps"),
      href: "#/maps"
    },
    {
      title: __("API keys"),
      href: null
    }
  ];

  const handler = (name: string) => {
    return createKey(props.session, props.teamId, name).then(result => {
      if (result.error) {
        setMessage(result.message);
        throw new Error(result.code);
      } else {
        props.addKey(props.teamId, result.data);
      }
    });
  };

  const { mapKeys } = props;
  const rows = mapKeys.map(key => {
    return {
      id: key.userKey,
      name: key.name,
      updated: key.createAt
    };
  });

  return (
    <div>
      <Title breadcrumb={breadcrumbItems} title={__("API keys")}>
        {__("You need an API key to display map. Get an API key.")}
      </Title>

      <AddNew
        label={__("Create a new API key")}
        description={__("Please enter the name of new API key.")}
        defaultValue={__("My API")}
        onClick={handler}
        onError={() => void 0}
        errorMessage={message}
      />

      <Table rows={rows} rowsPerPage={10} permalink="/maps/api-keys/%s" />
    </div>
  );
}

const mapStateToProps = (state: AppState): StateProps => {
  const session = state.authSupport.session;
  const { data: teams, selectedIndex } = state.team;
  const teamId = teams[selectedIndex] && teams[selectedIndex].teamId;
  const { data: mapKeys = [], error = false } = state.mapKey[teamId] || {};

  return { session, mapKeys, error, teamId };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => {
  return {
    addKey: (teamId: string, key: Key) =>
      dispatch(createMapKeyActions.add(teamId, key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
