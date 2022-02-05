import { FETCH_ALL, CREATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      // map - iterate over an array and manipulate or modify data
    case CREATE:
      return [...posts, action.payload];
      // ...posts
      // {concatenate} - var shooterGames = ['Call of Duty', 'Far Cry', 'Resident Evil'];
      // var racingGames = ['Need For Speed', 'Gran Turismo', 'Burnout'];
      // var games = [...shooterGames, ...racingGames];
      // LOGIC - Takes all arguments as one array
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
      // filter the contents of the original array, based on the callback's parameters
    default:
      return posts;
  }
};

