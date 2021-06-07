import React, { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';

import Container from './component/Container';
import AppBar from './component/AppBar';
import Loader from './component/Loader';

import { authOperations } from './redux/auth';

const HomePage = lazy(() =>
  import('./views/HomeView' /*webpackChunkName: 'home-page' */),
);
const Register = lazy(() =>
  import('./views/RegisterView' /*webpackChunkName: 'register' */),
);
const Login = lazy(() =>
  import('./views/LoginView' /*webpackChunkName: 'Login' */),
);

const PhoneBook = lazy(() =>
  import('./views/PhonebookView' /*webpackChunkName: 'phone-book' */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Container>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/" component={HomePage} />

            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={Register}
            />

            <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts"
              component={Login}
            />

            <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={PhoneBook}
            />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
