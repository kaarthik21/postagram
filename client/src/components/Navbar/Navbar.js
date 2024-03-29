import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import image from '../../images/image.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const create = () => {
    dispatch({ type: actionType.CREATE });

    history.push('/create');
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Postagram</Typography>
        <img className={classes.image} src={image} alt="icon" height="70" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button style={{ marginLeft: '-70px', minHeight: '35px', maxHeight: '35px', minWidth: '127px', maxWidth: '130px', fontSize: '13px' }} variant="contained" className={classes.create} color="secondary" onClick={create}>Create post</Button>us:&nbsp;
            <Button style={{ minHeight: '35px', maxHeight: '35px', minWidth: '70px', maxWidth: '80px', fontSize: '13px' }} variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
