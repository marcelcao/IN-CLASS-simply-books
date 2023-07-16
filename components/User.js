/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';
import SignOut from './SignOut';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="user=profile">
      <img src={user.photoURL} alt="user" width="100px" height="100px" />
      <h1>{user.displayName}</h1>
      <h2>{user.email}</h2>
      <h3>{user.metadata.lastSignInTime}</h3>
      <SignOut />
    </div>
  );
}
