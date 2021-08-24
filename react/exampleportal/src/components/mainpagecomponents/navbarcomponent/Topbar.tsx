import React from 'react';
import './TopBar.css';
import {useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from "../../../redux/actions";

/* Need to install React-select
    npm install --save react-select
*/

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

/**
 * @author zacha
 * @returns Navigation bar with logout feature
 */
const Topbar = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
 
    

      const logouter = async () => {
        
        dispatch(logout());

    }

  return (
    <>
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            STUDENT PORTAL
          </Typography>
          <Button color="inherit" >DASHBOARD</Button>
          <Button color="inherit" >COMMUNITY</Button>
          <Button color="inherit" >SUPPORT</Button>
          <Button color="inherit" onClick = {logouter}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
        
    </>
  );
};


export default Topbar;
