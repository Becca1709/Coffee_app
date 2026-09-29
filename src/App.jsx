import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
//project components
import { ClientDrop } from "../components/clientdrop";
import { NavBar } from "../components/navbar";

//css
import "./App.css";
import Favorite from "../components/favorite";
import { NewORder } from "../components/neworder";

function App() {
  const { id: client } = useParams();
  const location = useLocation();
  const { id, name } = location.state || {};
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header>
        <NavBar menu={handleClick} />
      </header>
      <main className="homepage">
        <section id="customer">
          <div className="app">
            <div className="top">
              <img src="./src/assets/coffee.jpg" width="100%" />
              <h1>Wanna Cuppa?</h1>
            </div>
            <div className="client_orders">
              <ClientDrop />
              <hr></hr>
              {id && (
                <div id="coffee_form">
                  <Favorite id={id} />
                  <hr></hr>
                  <NewORder id={id} />
                </div>
              )}
            </div>
          </div>
        </section>
        <section id="menu">
          <div ref={ref} className="menuimage">
            <img src="./src/assets/menu.jpg" height="800px" />
          </div>
        </section>
        <section id="about">
          <div className="about">
            <h3>About this project</h3>
            <p>Something something</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
