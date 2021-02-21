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
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  app_bar:{
    backgroundColor:"#606ca9"
  },
  username_input:{
    backgroundColor: theme.palette.common.white,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  form_card:{
    marginTop:0
  },
  card_content:{
    // padding: 0,
    "&:last-child": {
      paddingBottom: 16
    }
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
function SignInModal(props) {
  const classes = useStyles();
  const webcamRef: React.RefObject<Webcam & HTMLVideoElement> = React.useRef(null);
  const capture = React.useCallback(
    () => {
      if(webcamRef && webcamRef.current){
        return webcamRef.current.getScreenshot();
      }
    },
    [webcamRef]
  );
  const sign_in=async ()=>{
    const image=capture()
    if(typeof image!=="string"){
      return
    }
    const img_blob = await fetch(image).then(res => res.blob())
    console.log(img_blob)
    const formData = new FormData();
    formData.append("image",img_blob)
    axios(`/sign_in`, {
      method: "post",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((resp) => {
      alert('Successful');
      // router.push("/");
      console.log(resp)
    }).catch((err) => {
      alert(true);
      if (err.response) {
        alert(err.response.data.message)
        console.log(err.response)
      } else {
        alert("Unknown error")
      }
    })
  }
  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
       <Fade in={props.open} style={{outline:0}}>
        <Card className={classes.form_card}>
          <CardContent className={classes.card_content}>
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <Webcam ref={webcamRef} screenshotFormat="image/jpeg" screenshotQuality={1} audio={false} width={320} height={180} />
              <Button style={{ marginTop: "10px" }} variant="contained" onClick={sign_in} >Sign In</Button>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
    )
}
function SignUpModal(props){
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const webcamRef: React.RefObject<Webcam & HTMLVideoElement> = React.useRef(null);
  const capture = React.useCallback(
    () => {
      if(webcamRef && webcamRef.current){
        return webcamRef.current.getScreenshot();
      }
    },
    [webcamRef]
  );
  const sign_up=async ()=>{
    const image=capture()
    if(typeof image!=="string"){
      return
    }
    const img_blob = await fetch(image).then(res => res.blob())
    console.log(img_blob)
    const formData = new FormData();
    formData.append("image",img_blob)
    console.log(username)
    formData.append("username",username)
    axios(`/sign_up`, {
      method: "post",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((resp) => {
      alert('Successful');
      // router.push("/");
      console.log(resp)
    }).catch((err) => {
      alert(true);
      if (err.response) {
        alert(err.response.data.message)
        console.log(err.response)
      } else {
        alert("Unknown error")
      }
    })
  }
  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open} style={{outline:0}}>
        <Card className={classes.form_card}>
          <CardContent className={classes.card_content}>
            <div style={{ display: "flex", flexDirection: 'column' }}>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" screenshotQuality={1} audio={false} width={320} height={180} />
              <TextField  onChange={(e) => setUsername(e.target.value)} style={{ marginTop: "10px" }} size="small" id="standard-basic" label="Username" variant="outlined" />
              <Button style={{ marginTop: "10px" }} onClick={sign_up}  variant="contained" >Sign Up</Button>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </Modal>)
}

function SignForm(){
  const classes = useStyles();
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };
  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  return (
    <div>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.card_content}>
            <Grid
              className={classes.Oauth}
              container
              direction="row"
              justify="center"
              spacing={1}
              alignItems="center"
            >
              <Grid item>
                <Button onClick={handleOpenSignIn} variant="contained">Sign in</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleOpenSignUp} variant="contained" >Sign up</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <SignInModal open={openSignIn} handleClose={handleCloseSignIn}/>
      <SignUpModal open={openSignUp} handleClose={handleCloseSignUp}/>
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