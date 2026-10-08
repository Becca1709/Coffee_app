import { Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useLatestOrder } from "./useLastestOrder";
import { useParams, useLocation } from "react-router-dom";

export function Order_confirm({ confirmation, setConfirmation, orderId }) {
  //1#hooks
  const timerRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(60);
  const { lastOrder, fetchLatest } = useLatestOrder();
  const [orderStatus, setOrderStatus] = useState("");

  //2# useEffect
  useEffect(() => {
    if (confirmation) {
      setTimeLeft(60);
      fetchLatest();
    }
  }, [confirmation]);

  useEffect(() => {
    // Only run timer if an order is active and time remains
    if (!confirmation || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    //  fetchLatest();
    // Clean up interval when component unmounts or state updates
    return () => clearInterval(timerRef.current);
  }, [confirmation, timeLeft]);

  //3#condional rendering
  if (!confirmation) return null;
  //can it be here?

  const canDelete = timeLeft > 0;

  //fix this function
  const handleDeleteOrder = async (e) => {
    if (e) e.preventDefault();
    if (!confirmation) return;

    try {
      const response = await fetch(
        `http://localhost:3008/orders/${lastOrder}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      console.log(data.message);
      if (!response.ok) {
        throw new Error("Failed to delete the order.");
      }
      //setConfirmation(false);
      setOrderStatus("Order successfully deleted.");
      // setTimeLeft(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      alert("Order deleted");

      await fetchLatest();

      //setTimeout(() => {
      //  setOrderStatus("");
      //}, 10000);

      return console.log("Order deleted");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Could not delete the order. Please try again.");
    }
  };
  return (
    <>
      <div id="confirm">
        <form className="grid-form">
          <div className="form-confirm">
            {orderStatus && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f6f5",
                  color: "#cc4400",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  marginTop: "15px",
                }}
              >
                {orderStatus}
              </div>
            )}
            {canDelete && !orderStatus && (
              <div>
                <p>Your order has been successfully placed!</p>
                <p>
                  Time to cancel: <strong>{timeLeft}</strong> seconds.
                </p>
                <p>your order number is: {lastOrder}</p>
                <Button
                  size="sm"
                  type="button"
                  onClick={(e) => handleDeleteOrder()}
                >
                  Delete Order
                </Button>
              </div>
            )}
            {timeLeft === 0 && (
              <>
                <p>Can't delete any more</p>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
