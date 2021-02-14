import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Webcam from "react-webcam";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  app_bar:{
    backgroundColor:"#606ca9"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexGrow: 1,
    marginBottom:'10px'
  },
  tool_bar:{
   minHeight:"36px!"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    margin: `${theme.spacing(0)} auto`
  },
  loginBtn: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  card: {
    marginTop: theme.spacing(10),
  },
  CardActions: {
    'flex-wrap': 'wrap'
  },
  Oauth: {
    'margin-left': '0px !important'
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
function SignInModal(){

}
function SignUpModal(){

}

function SignForm(){
  const classes = useStyles();
  const [openSignInl, setOpenSignIn] = React.useState(false);

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  return (
    <div className={classes.container}>
  <Card className={classes.card}>
  <CardContent>
  <Grid
      className={classes.Oauth}
      container
      direction="row"
      justify="center"
      spacing={1}
      alignItems="center"
    >
      <Grid item>
        <Button
          variant="contained">Sign in</Button>
      </Grid>
      <Grid item>
        <Button variant="contained">Sign up</Button>
      </Grid>
    </Grid>
  </CardContent>
</Card>
</div>)
}

export default function Index() {
  return (
    <div>
      <DenseAppBar/>
      <SignForm/>
      {/* <Webcam /> */}
    </div>
  );
}