import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/material/Lock";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { loginAdmin } from '../collections/Service/data';
import swal from 'sweetalert';


import Container from "@mui/material/Container";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    // marginTop: "50px"
    
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop:"130px",

    
  },
  avatar: {
    
    margin: "5px",
    // backgroundColor: "blue"

    marginTop:"70px"
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    marginBottom:"70px"
    
  },
  submit: {
    // margin: theme.spacing(3, 0, 2)
    
  }
}));

const SignInSide = () => {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    
    e.preventDefault();
    console.log("Here loging: ", email, password)
    try {
      const response = await loginAdmin(
      email,
      password
    );
    if ('accessToken' in response) {
      swal("Success", "Successful", "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/admin-lading-page";
      });
    } else {
      swal("Failed", "Successful", "error");
    }}catch{
      swal("Failed", "Incorrect Login Details", "error");
    }
  }

  return (
    
    <Container component="main" >
      <Grid item xs={12} sm={5} md={8} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              autoFocus
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/admin-singup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              {/* <MadeWithLove /> */}
            </Box>
          </form>
        </div>
      </Grid>
    </Container>
    // </div>
  );
};

export default SignInSide;
