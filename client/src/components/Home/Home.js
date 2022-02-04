import React, { useState, useEffect } from 'react';
// useState Hook is where variables are stored in functional components
// useEffect is for fetching data, directly updating to DOM
// Hooks are used
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';

/* import Form from '../Form/Form'; */

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch" spacing={1}>
          <Grid item xs={12} sm={10}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          { /*
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          */ }
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
