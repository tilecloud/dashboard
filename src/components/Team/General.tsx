import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Save from '../custom/Save'
import defaultGroupIcon from '../custom/group.svg';

const Content = () => {
  const styleDangerZone: React.CSSProperties = {
    border: '1px solid #ff0000',
    padding: '16px 24px',
  }

  const ProfileImageStyle: React.CSSProperties = {
    width: '250px',
    height: 'auto',
    margin: '16px',
  }

  return (
    <Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography component="h2" className="module-title">General</Typography>
          <TextField
            id="standard-name"
            label="Name"
            margin="normal"
            fullWidth={true}
          />
          <TextField
            id="standard-name"
            label="Slug"
            margin="normal"
            fullWidth={true}
          />
          <TextField
            id="standard-name"
            label="Description"
            margin="normal"
            multiline={true}
            rows={5}
            fullWidth={true}
          />
          <TextField
            id="standard-name"
            label="URL"
            margin="normal"
            fullWidth={true}
          />
          <Save />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography component="p" align="center"><img src={defaultGroupIcon} style={ProfileImageStyle} alt="" /><br />
          <Button variant="contained" color="default">Upload new picture</Button></Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <div style={styleDangerZone}>
            <Typography component="h3" color="secondary">Danger Zone</Typography>
            <p>Once you delete a team, there is no going back. Please be certain. </p>
            <Button variant="contained" color="secondary">Delete</Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Content;
