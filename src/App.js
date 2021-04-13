import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
const code = new URLSearchParams(window.location.search).get("code");
const storageCheck = localStorage.getItem("checkins");

function App() {
  return (
    <>
      <div className="section">
        <div className="title">
          <Header loggedIn={code || storageCheck != null ? true : false} />
        </div>
      </div>
      {code || storageCheck != null ? <Dashboard code={code} /> : <Login />}
      <Footer />
    </>
  );
}

export default App;
