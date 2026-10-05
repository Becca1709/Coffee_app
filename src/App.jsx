import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
//project components
import { ClientDrop } from "../components/clientdrop";
import { NavBar } from "../components/navbar";
import { Order_confirm } from "../components/orderconf";

//css
import "./App.css";
import Favorite from "../components/favorite";
import { NewORder } from "../components/neworder";

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

  // to review 1. Fetch the latest order ID from the database when the app loads
  /* useEffect(() => {

    const fetchLatestOrderId = async () => {
      try {
        // Replace with your actual backend GET route for orders
        const response = await fetch('/api/orders/latest'); 
        const data = await response.json(); 
        
        // Assuming your backend returns a message like { message: "Latest order is 8" }
        // or a direct object like { id: 8 }
        if (data && data.message) {
          const match = data.message.match(/\d+/); 
          if (match) {
            setOrderId(parseInt(match[0], 10));
            setConfirmation(true); // Automatically show Child 2 if an active order exists
          }
        } else if (data && data.id) {
          // If it returns a standard object instead
          setOrderId(data.id);
          setConfirmation(true);
        }
      } catch (error) {
        console.error("Error fetching the latest order ID:", error);
      }
    };

    fetchLatestOrderId();
  }, []); // Empty array ensures this runs exactly ONCE when the website opens * */

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
                  <NewORder id={id} />
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
