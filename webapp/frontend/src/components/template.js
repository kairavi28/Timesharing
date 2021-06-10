import React from 'react';
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Timesharing
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
image: {
        backgroundImage: "url(/backdrop.jpg)",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
wrapper: {
    backgroundColor:"rgb(255 247 250 / 50%);"
},
titleStyle:{
    fontSize:'30px',
    color:"black",
    fontStyle:"Arial"
},
  paper: {
    marginTop: theme.spacing(10),
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
    height: '100%',
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  section:{
      height: "500px"
  }
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <div className={classes.image}>
    <span className={classes.titleStyle}> Timesharing</span>
    <Container component="main" maxWidth="sm" className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Hey Fellas! Let's bid...
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            </Grid>
            <Grid item item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoFocus
            />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            BID              
        </Button>&nbsp;
        <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            REVERT              
        </Button>
        </form>
        
      </div>
      <div className={classes.section}>
        </div>
    </Container>
    </div>
  );
}