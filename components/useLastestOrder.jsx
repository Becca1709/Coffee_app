import { useState, useCallback } from "react";

export function useLatestOrder() {
  const [lastOrder, setLastOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatest = useCallback(() => {
    console.log("🚀 [HOOK] ¡fetchLatest() executed just now!");
    setIsLoading(true);

    fetch("http://localhost:3008/orders/latest")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        // Caso A: Si tu backend te mandó un array directo dentro de latestOrder (por el LIMIT 1 de MySQL)
        if (data.latestOrder && Array.isArray(data.latestOrder)) {
          console.log(
            "ℹ️ Detectamos que latestOrder es un ARRAY de largo:",
            data.latestOrder.length,
          );

          if (data.latestOrder.length > 0) {
            // Probamos buscando .id o .order_id (ajusta si tu columna tiene otro nombre)
            const numeroOrden =
              data.latestOrder[0].id || data.latestOrder[0].order_id;
            console.log("🎯 [ÉXITO ARRAY] Saving order number:", numeroOrden);
            setLastOrder(numeroOrden);
          } else {
            console.warn("⚠️ Empty array.Have you made any orders today?");
            setLastOrder(null);
          }
        } else if (data.latestOrder && typeof data.latestOrder === "object") {
          const numeroOrden = data.latestOrder.id || data.latestOrder.order_id;
          setLastOrder(numeroOrden);
        } else {
          setLastOrder(null);
        }
      })
      .catch((error) => {
        console.error("💥 [ERROR CATCH] fetch completely failed:", error);
      })
      .finally(() => setIsLoading(false));
  }, [setLastOrder]);

  return { lastOrder, isLoading, fetchLatest };
}
