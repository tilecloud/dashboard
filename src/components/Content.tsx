import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,Theme } from '@material-ui/core/styles';
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import APIKeys from './Maps/APIKeys';


const styles = (theme:Theme) => ({
  // paper: {
  //   maxWidth: 936,
  //   margin: 'auto',
  //   overflow: 'hidden',
  // },
  // searchBar: {
  //   borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  // },
  // searchInput: {
  //   fontSize: theme.typography.fontSize,
  // },
  // block: {
  //   display: 'block',
  // },
  // addUser: {
  //   marginRight: theme.spacing(1),
  // },
  // contentWrapper: {
  //   margin: '40px 16px',
  // },
});

type Props= {
  classes: any
}

function Content(props: Props) {
  const { classes } = props;

  return (
    <HashRouter>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/maps/api-keys' component={APIKeys} />
    </HashRouter>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
