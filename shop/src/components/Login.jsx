import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = ({
  handleGoogleSignIn,
  handleEmailSignIn,
  handleEmailSignUp,
  auth,
}) => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [emailSent, setEmailSent] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleEmailSignUpSubmit = (e) => {
    e.preventDefault();
    handleEmailSignUp(
      signUpForm.userName,
      signUpForm.email,
      signUpForm.password
    );
  };

  const handleEmailSignInSubmit = (e) => {
    e.preventDefault();
    handleEmailSignIn(signInForm.email, signInForm.password);
  };

  const sendResetEmail = () => {
    sendPasswordResetEmail(auth, signInForm.email).then(() => {
      setEmailSent(true);
    });
  };

  return (
    <div className='my-2'>
      {!signIn ? (
        <div>
          <div className='mb-2'>
            <h1 className='text-xl font-bold'>Sign up with Email:</h1>
            <button
              className='font-semibold text-sm p-2 rounded-lg py-1 px-2 mx-auto'
              onClick={() => setSignIn(true)}
            >
              Already have an account?
            </button>
          </div>
          <form
            onSubmit={handleEmailSignUpSubmit}
            className='flex flex-col gap-2 w-auto md:w-96 mx-auto'
          >
            <input
              type='text'
              value={setSignUpForm.userName}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, userName: e.target.value })
              }
              placeholder='Name'
              className='py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700'
            />
            <input
              type='email'
              value={setSignUpForm.email}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, email: e.target.value })
              }
              placeholder='Email'
              className='py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700'
            />
            <input
              type='password'
              value={setSignUpForm.password}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, password: e.target.value })
              }
              placeholder='Password'
              className='py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700'
            />
            <p id='error-msg' className='text-xs text-red-500'></p>
            <button
              type='submit'
              className='font-bold text-md border border-gray-400 p-2 rounded-lg py-1 px-2 hover:scale-105 duration-200 mx-auto'
            >
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className='mb-2'>
            <h1 className='text-xl font-bold'>Sign in with Email:</h1>
            <button
              className='font-semibold text-sm p-2 rounded-lg py-1 px-2 mx-auto'
              onClick={() => setSignIn(false)}
            >
              Not a user yet? Sign up
            </button>
          </div>
          <form
            onSubmit={handleEmailSignInSubmit}
            className='flex flex-col gap-2 w-auto md:w-96 mx-auto'
          >
            <input
              type='email'
              value={signInForm.email}
              onChange={(e) =>
                setSignInForm({ ...signInForm, email: e.target.value })
              }
              placeholder='Email'
              className='py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700'
            />
            <input
              type='password'
              value={signInForm.password}
              onChange={(e) =>
                setSignInForm({ ...signInForm, password: e.target.value })
              }
              placeholder='Password'
              className='py-1 px-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-700'
            />
            <p id='error-msg' className='text-xs text-red-500'></p>
            <button
              type='submit'
              className='font-bold text-md border border-gray-400 p-2 rounded-lg py-1 px-2 hover:scale-105 duration-200 mx-auto'
            >
              Sign In
            </button>
          </form>
          {!emailSent ? (
            <button className='text-sm' onClick={sendResetEmail}>
              Forgot your password?
            </button>
          ) : (
            <p className='text-sm'>Email Sent! Check your inbox</p>
          )}
        </div>
      )}
      <p className='my-2'>or</p>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className='font-bold text-md border border-gray-400 p-2 rounded-lg py-1 px-2 hover:scale-105 duration-200'
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
