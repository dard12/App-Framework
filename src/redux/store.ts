import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { loginReducer } from './reducers/login-reducer';
import logger from 'redux-logger';
import Axios from 'axios';

export const store = configureStore({
  reducer: loginReducer,
  middleware: [...getDefaultMiddleware(), logger]
});

function persistLogin() {
  const { token } = store.getState();

  if (token) {
    localStorage.setItem('token', token);
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    Axios.defaults.headers.common['Authorization'] = null;
  }
}

persistLogin();

store.subscribe(persistLogin);
