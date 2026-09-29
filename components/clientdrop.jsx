import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ReactDOM from "react-dom";
import { Container, Button, Alert, Dropdown } from "react-bootstrap";
import { Autocomplete } from "./autocomplete";

export function ClientDrop() {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [data, setData] = useState([]);
  //maps through the db information to diplay suggestions in search bar
  const suggestions = Array.isArray(data)
    ? data.map((d) => ({ id: d.monks_id, name: d.name }))
    : [];
  //fetch the database info to diplay in the search
  useEffect(() => {
    fetch("http://localhost:3008/monks")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setData(data);
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);
  //saves the information selected in the search bar
  const handleItemSelect = (data) => {
    // console.log('Selected ID received in parent:', data);
    setSelectedName(data.name);
    setSelectedID(data.id);
    // You can now use `id` here for API calls, form submits, etc.
  };

  /*for testing useEffect(() => {
  console.log('2. Updated selectedId in state:', selectedID);
}, [selectedID]);*/

  //onsubmit fuction to send the id from the name to the dashboard and end on navigate
  const handleSubmit = (e) => {
    e.preventDefault();

    // if selectedId is empty, stop!
    if (!selectedID) {
      return;
    }

    // dynamic variable in URL
    /*navigate(`/dashboard/${selectedID}`, { 
    state: { 
      id: selectedID, 
      name: selectedName, 
    } 
  });*/
    navigate(`/${selectedID}`, {
      state: {
        id: selectedID,
        name: selectedName,
      },
    });
  };

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit} class="grid-form">
          <div class="form-group" id="name-id">
            <Autocomplete
              suggestions={suggestions}
              placeholder="Type your name"
              onSelect={handleItemSelect}
            />

            <Button type="submit">Select</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
