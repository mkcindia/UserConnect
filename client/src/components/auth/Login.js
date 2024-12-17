'use client';

import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="login-div">
      {isSignIn ? <SignIn /> : <SignUp />}

      <button
        style={{ backgroundColor: 'white', color: 'blue' }}
        onClick={handleToggleForm}
      >
        {isSignIn
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Sign In'}
      </button>
    </div>
  );
};

export default Login;
