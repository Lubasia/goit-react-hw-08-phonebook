import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [authActions.registerSuccess]: (_, { payload }) => payload.user,
  [authActions.loginSuccess]: (_, { payload }) => payload.user,
  [authActions.logoutSuccess]: () => initialUserState,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.loginError]: setError,
  [authActions.logoutError]: setError,
  [authActions.getCurrentUserError]: setError,
});
const isAuthenticated = createReducer(false, {
  [authActions.registerSuccess]: () => true, //пользователь успешно зарегестрирован

  [authActions.loginSuccess]: () => true, //успешная логинизация

  [authActions.getCurrentUserSuccess]: () => true, //успешная авторизация

  [authActions.getCurrentUserRequest]: () => true, //костыль, чтобы при перезагрузке страницы пока идет авторизация пользователя, чтобы не перекидывало на несколько секунд на страницу логинизации

  // при ошибках isAuthenticated=false
  [authActions.registerError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserError]: () => false,

  [authActions.logoutSuccess]: () => false, //когда успешно разлогинен
});

export default combineReducers({
  user,
  token,
  error,
  isAuthenticated,
});
