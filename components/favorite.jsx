import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export function Favorite({ setConfirmation, setLoading, setOrderId, loading }) {
  const { id } = useParams();
  //console.log("El ID del cliente recibido es:", id);
  const [favorite, setFavorite] = useState([]);

  //gets FAVORITE drink from USER
  useEffect(() => {
    fetch(`http://localhost:3008/rank/${id}`)
      .then((response) => response.json())
      .then((favorite) => {
        //console.log(favorite);
        setFavorite(favorite);
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);

  // onclick post to db a new order with favorite coffee info
  const OrderAgain = async (e, favorite) => {
    e.preventDefault(); //no refresh
    const idRequest = id;

    // Validación: Si no hay un ID de cliente válido, no podemos hacer el pedido
    if (!idRequest) {
      console.warn("🛑 DETENIDO: 'id is missing. Check variables", {
        id: id,
      });
      return;
    }
    if (!favorite?.coffee_code) {
      console.warn("🛑: Coffee code is missing");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    setLoading(true);

    try {
      //console.log('Sending request to:', `http://localhost:3008/orders/${idRequest}`);
      const response = await fetch(
        `http://localhost:3008/orders/${idRequest}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coffee: favorite.coffee_code,
            milk: favorite.milk,
            created_at: today,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save favorite");
      }

      const data = await response.json();
      // const newOrderId = data.id;
      //setOrderId(newOrderId);
      setConfirmation(true);
      //alert("Order Successful!");
      console.log("The data is:", data);
    } catch (error) {
      console.error("Error saving favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="grid-form">
        <div className="form-group">
          <label>Your Favorite coffee is a</label>
          <output>{favorite.name}</output>
          <Button
            size="sm"
            type="submit"
            onClick={(e) => OrderAgain(e, favorite)}
            disabled={loading}
          >
            {loading ? "Saving..." : "+"}
          </Button>{" "}
        </div>
      </form>
    </div>
  );
}
export default Favorite;
