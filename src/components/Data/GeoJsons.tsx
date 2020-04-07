import React from "react";

// components
import Table from "../custom/Table";
import AddNew from "../custom/AddNew";
import Title from "../custom/Title";

// utils
import { __ } from "@wordpress/i18n";
import { connect } from "react-redux";

// types
import {
  AppState,
  Session,
} from "../../types";

// api
import createGeosearch from "../../api/geosearch/create";

const { REACT_APP_STAGE } = process.env;

type Row = {
  id: number | string;
  name: string;
  updated: string;
  isPublic: boolean;
};

type OwnProps = {};
type StateProps = {
  session: Session;
  teamId?: string;
};
type Props = OwnProps & StateProps;

type typeTableRows = {
  id: string;
  name: string;
  updated: string;
  isPublic?: boolean | undefined;
};

function Content(props: Props) {
  const [message, setMessage] = React.useState("");
  const [geoJsons, setGeoJsons] = React.useState<typeTableRows[]>([]);
  const [added, setAdded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.teamId && props.session) {
      const idToken = props.session.getIdToken().getJwtToken();

      fetch(
        `https://api.app.geolonia.com/${REACT_APP_STAGE}/teams/${props.teamId}/geosearch`,
        {
          headers: {
            Authorization: idToken
          }
        }
      )
        .then(res => res.json())
        .then(json => {
          const rows = [];
          for (let i = 0; i < json.length; i++) {
            // const item = dateParse<DateStringify<any>>(json[i]);
            const item = json[i]
            rows.push({
              id: item.id,
              name: item.name,
              updated: item.updateAt,
              isPublic: item.isPublic
            } as typeTableRows);
          }
          setGeoJsons(
            rows.sort((a: typeTableRows, b: typeTableRows) => {
              if (a.updated > b.updated) {
                return -1;
              } else {
                return 1;
              }
            })
          );
        });
    }
  }, [props.teamId, props.session, added]);

  const breadcrumbItems = [
    {
      title: __("Home"),
      href: "#/"
    },
    {
      title: __("API services"),
      href: null
    }
  ];

  const handler = (name: string) => {
    const { teamId } = props;
    if (!teamId) {
      return Promise.resolve();
    }

    return createGeosearch(props.session, teamId, name).then(result => {
      if (result.error) {
        setMessage(result.message);
        throw new Error(result.code);
      } else {
        setAdded(true);
      }
    });
  };

  return (
    <div>
      <Title breadcrumb={breadcrumbItems} title="GeoJSON API">
        {__(
          "GeoJSON API is an API service specialized for location data. Register various location information data such as stores and real estate informations that you have."
        )}
      </Title>

      <AddNew
        label={__("Create a new dataset")}
        description={__("Please enter the name of the new dataset.")}
        defaultValue={__("My dataset")}
        onClick={handler}
        onError={() => {
          /*TODO: show messages*/
        }}
        errorMessage={message}
      />

      <Table rows={geoJsons} rowsPerPage={10} permalink="/data/geojson/%s" />
    </div>
  );
}

export const mapStateToProps = (state: AppState): StateProps => {
  const team = state.team.data[state.team.selectedIndex];
  const { session } = state.authSupport;
  if (team) {
    const { teamId } = team;
    return {
      session,
      teamId,
    };
  } else {
    return { session };
  }
};

export default connect(mapStateToProps)(Content);