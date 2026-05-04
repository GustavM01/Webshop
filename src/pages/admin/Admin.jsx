import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { logIn, logOut, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  if (!user) return <button onClick={logIn}>Login</button>;

  return (
    <div>
      <h1>{user.displayName}</h1>
      <button onClick={logOut}>Logout</button>
      <p>Admin sidan</p>
    </div>
  );
}

export default Admin;
