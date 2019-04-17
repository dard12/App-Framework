import { createReducer } from 'redux-starter-kit';
import { loginAction, logoutAction } from '../actions/login-action';

interface LoginInterface {
  token: string | null;
}

const initialState: LoginInterface = {
  token: localStorage.getItem('token')
};

export const loginReducer = createReducer<LoginInterface>(initialState, {
  [loginAction.type]: (state, action) => {
    state.token = action.payload;
  },

  [logoutAction.type]: (state, action) => {
    state.token = null;
  }
});
