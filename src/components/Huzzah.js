/* Purpose: To render Huzzah if logged in. If not, redirect to login page*/
import React from "react";
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Huzzah.css";

export const Huzzah = () => (
  
  <>
  <h1>Huzzah</h1>
    <Route
      render={() => {
        if (localStorage.getItem("huzzah_user")) {
          return (
            <>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);