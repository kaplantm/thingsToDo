import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { setUser } from '../redux/slices/user';

// https://rnfirebase.io/auth/usage#listening-to-authentication-state

function AuthService({ doSetUser }) {
  // Handle user state changes

  useEffect(() => {
    function onAuthStateChanged(user) {
      console.log('onAuthStateChanged', { user });
      if (user) {
        doSetUser({ user });
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
    return subscriber;
  }, [doSetUser]);

  return null;
}

export default connect(null, {
  doSetUser: setUser,
})(AuthService);
