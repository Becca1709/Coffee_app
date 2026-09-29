import { Form, Button } from "react-bootstrap";
import { Autocomplete } from "./autocomplete";
import { useState, useEffect } from "react";

export function NewORder({ id }) {
  const [coffeedb, setCoffeedb] = useState([]);
  const [milkdb, setMilkdb] = useState([]);
  const coffee = Array.isArray(coffeedb) ? coffeedb.map((c) => c.name) : [];
  const milk = Array.isArray(milkdb) ? milkdb.map((m) => m.milk_name) : [];

  useEffect(() => {
    fetch("http://localhost:3008/coffee")
      .then((response) => response.json())
      .then((coffeedb) => {
        console.log(coffeedb);
        setCoffeedb(coffeedb);
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);
  //gets from db the milk options
  useEffect(() => {
    fetch("http://localhost:3008/milk")
      .then((response) => response.json())
      .then((milkdb) => {
        console.log(milkdb);
        setMilkdb(milkdb);
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);

  //onclick add function to fetch all the coffee options from db and map to create each option value
  return (
    <div>
      <form className="grid-form" id="no_form">
        <h2 className="tittle">New order</h2>
        <div id="selections">
          <label>Select options</label>
          <div className="neworder_input">
            <Autocomplete
              suggestions={coffee}
              placeholder="Select your coffee"
            />
            <Autocomplete suggestions={milk} placeholder="Select your milk" />
          </div>
          <Button type="submit" size="sm">
            +
          </Button>
        </div>
      </form>
    </div>
  );
}
