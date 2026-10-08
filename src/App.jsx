import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
//project components
import { ClientDrop } from "../components/clientdrop";
import { NavBar } from "../components/navbar";
import { Order_confirm } from "../components/orderconf";
import Favorite from "../components/favorite";

//css
import "./App.css";

function App() {
  const { id: client } = useParams();
  const location = useLocation();
  //id of client and name
  const { id, name } = location.state || {};
  //loading favorite from db
  const [loading, setLoading] = useState(false);
  //order success
  const [confirmation, setConfirmation] = useState(false);
  //order number
  const [orderId, setOrderId] = useState(null);

  //menu position
  const ref = useRef(null);
  //scroll to menu
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  //update details??
  /*<button type="button">Update details</button>
            </div>*/
  //about??
  /*         <section id="about">
          <div className="about">
            <h3>About this project</h3>
            <p>Something something</p>
          </div>
        </section> */
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
                  <Favorite
                    id={id}
                    loading={loading}
                    setConfirmation={setConfirmation}
                    setLoading={setLoading}
                    setOrderId={setOrderId}
                  />
                  <hr></hr>
                </div>
              )}
              <Order_confirm confirmation={confirmation} orderId={orderId} />
            </div>
          </div>
        </section>
        <section id="menu">
          <div ref={ref} className="menuimage">
            <img src="./src/assets/menu.jpg" height="800px" />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
