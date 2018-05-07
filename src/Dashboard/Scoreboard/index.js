import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import Event from './Event';
import Players from './Players';

import { withStyles } from 'material-ui/styles';

class Scoreboard extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction='column' spacing={16}>
        <Grid item>
          <Event />
        </Grid>
        <Grid item>
          <Players />
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  sponsor: {
    width: 60
  }
});

export default withStyles(styles)(Scoreboard);
