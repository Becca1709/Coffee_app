import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export function Order_confirm({ confirmation, setConfirmation, orderId }) {
  //1#hooks
  const [timeLeft, setTimeLeft] = useState(60);
  //2# useEffect
  useEffect(() => {
    if (confirmation) {
      setTimeLeft(60);
    }
  }, [confirmation]);

  useEffect(() => {
    // Only run timer if an order is active and time remains
    if (!confirmation || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up interval when component unmounts or state updates
    return () => clearInterval(timer);
  }, [confirmation, timeLeft]);
  //3#condional rendering
  if (!confirmation) return null;
  const canDelete = timeLeft > 0;

  //fix this function
  const handleDeleteOrder = async (e) => {
    if (e) e.preventDefault();
    if (!orderId) return;
    try {
      const response = await fetch(`http://localhost:3008/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the order.");
      }
      setConfirmation(false);
      setOrderId(null);
      setTimeLeft(0);
      alert("Order deleted");
      return console.log("Order deleted");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Could not delete the order. Please try again.");
    }
  };
  return (
    <div id="confirm">
      <form className="grid-form">
        <div className="form-confirm">
          <label>Your order has been successfully placed!</label>
          {canDelete ? (
            <div>
              <p>
                Time to cancel: <strong>{timeLeft}</strong> seconds.
              </p>
              <Button
                size="sm"
                type="button"
                onClick={(e) => handleDeleteOrder(e, orderId)}
              >
                Delete Order
              </Button>
            </div>
          ) : (
            <p>The 60-sec window has passed.</p>
          )}
        </div>
      </form>
    </div>
  );
}
