import React, { useState, SyntheticEvent } from "react";
import "./SignUp.css";
import { useHistory, Redirect } from "react-router-dom";
import { Dispatch } from "react";
import { IUser } from "../../redux/stateStructures";
import axios from "axios";
import * as ReactRedux from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Storage } from "aws-amplify";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RootState } from "../../redux/store";
import { registerAccount } from "../../redux/actions";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Walmart University
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignupForm = () => {
  // const { handleChange, handleSubmit, values, errors } = useForm(
  //   submitForm,
  //   validate
  // );

  //console.log(values);

  //const logged = useSelector((state: State) => state.isLogged);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const classes = useStyles();
  
  const signup = async (e: SyntheticEvent) => {
    e.preventDefault();
    const user: IUser = 
      {
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password,
        dateOfBirth: dateOfBirth,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        profilePicture: profilePicture,
      }
      dispatch(registerAccount(user));
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  const onSelectFile = (event: any) => {
    //Open files from computer
    const reader: any = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener("load", () => {
      ///setImage(event.target.files[0]);
      const imgToSend = event.target.files[0];
      console.log("you selected: ", imgToSend.name);
      fetchImages(imgToSend);
    });
  };

  async function fetchImages(imgToSend1: any) {
    console.log("image ready to fetch is : ", imgToSend1);
    if (imgToSend1) {
      Storage.put(imgToSend1.name, imgToSend1, {
        contentType: "image/png",
      });
      const imageKeys: any = await Storage.list(imgToSend1.name);
      console.log("imageKeys 1:", imageKeys);
      const imageKeys2: any = await Promise.all(
        imageKeys.map(async (k: any) => {
          const signedUrl = await Storage.get(k.key);
          return signedUrl;
        })
      );
      //setImages(imageKeys2); // save file(image name + key) to state
      setProfilePicture(imgToSend1.name);
    }
  }


  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={e => setFirstname(e.target.value)}
              value={firstname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={e => setLastname(e.target.value)}
              value={lastname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="current-username"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="dateofbirth"
              label="Date of Birth (yyyy-mm-dd)"
              type="dateofbirth"
              id="dateofbirth"
              onChange={e => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="streetAddress"
              label="Street Address"
              type="streetAddress"
              id="streetAddress"
              autoComplete="current-streetAddress"
              onChange={e => setStreetAddress(e.target.value)}
              value={streetAddress}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="city"
              label="City"
              type="city"
              id="city"
              autoComplete="current-city"
              onChange={e => setCity(e.target.value)}
              value={city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="state"
              label="State"
              type="state"
              id="state"
              autoComplete="current-state"
              onChange={e => setState(e.target.value)}
              value={state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="zipcode"
              label="Zip-Code"
              type="zipcode"
              id="zipcode"
              autoComplete="current-zipcode"
              onChange={e => setZipcode(e.target.value)}
              value={zipcode}
            />
          </Grid>
        </Grid>
        <br/>
        <input //className="custom-file2-input" 
          type="file"
          onChange={onSelectFile}/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {signup}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>

      </form>
    </div>
    <Box mt={5}>
      <Copyright />
    </Box>
  </Container>
    
  );
};


export default SignupForm;
