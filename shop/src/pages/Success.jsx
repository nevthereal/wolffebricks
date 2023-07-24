import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Success = ({ auth }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      Thank you for your order,{" "}
      {user ? user.displayName : loading ? null : null}! You will get a mail
      with the Instructions and Partlists soon!{" "}
      <a href='/' className='font-bold'>
        Back to home
      </a>
    </div>
  );
};

export default Success;
