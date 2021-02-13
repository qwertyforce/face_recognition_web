import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Webcam from "react-webcam";


const useStyles = makeStyles(() => ({
  app_bar:{
    backgroundColor:"#606ca9"
  },
  root: {
    flexGrow: 1,
    marginBottom:'10px'
  },
  tool_bar:{
   minHeight:"36px!"
  }
}));

function DenseAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app_bar}>
        <Toolbar variant="dense" className={classes.tool_bar}>
          <Typography variant="h6" color="inherit">
             Face Recognition test
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default function Index() {
  return (
    <div>
      <DenseAppBar/>
      Test
      <Webcam />
    </div>
  );
}