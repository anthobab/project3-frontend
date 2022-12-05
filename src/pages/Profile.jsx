import React from 'react';
import useAuth from '../auth/useAuth';

const Profile = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();

  return (
    <div>
      <h2>Welcome {currentUser.username}</h2>
      <button onClick={removeUser}>Log-Out</button>
    </div>
  );
};

export default Profile;
