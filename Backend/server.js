// require modules
require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3008;
/*app.use(express.urlencoded({ extended: true })) //read the html file
const https = require('node:https')
const fs = require('node:fs')*/
const mysql = require("mysql2");
const cors = require("cors");

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Create a connection to the database

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
// test connection
connection.connect((error) => {
  if (error) {
    return console.error("error: " + error.message);
  }
  console.log("Connected to the MySQL server.");
});

//HTML REQUEST FOR REST API

app.listen(port, () => {
  console.log("listening in " + port);
  console.log("Connecting to host:", process.env.DB_HOST);
});
//get html file
/*app.get('/monks', (req, res) => {
    res.sendFile(__dirname + '/index.html')
}*/
app.get("/coffee", (req, res) => {
  const sql = "SELECT * FROM coffee_ID";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/milk", (req, res) => {
  const sql = "SELECT * FROM milk_opt";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/monks/", (req, res) => {
  const sql = "SELECT * FROM clients";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//gets favorite option for display in dashboar by favorite
/*app.get('/rank/:id', async (req,res)=>{
    const itemId = req.params.id;
    console.log('Received ID:', itemId);
    const sql=`SELECT 
    coffee_code, 
    milk,
    COUNT(*) AS occurrence_count
FROM 
    coffee_orders
WHERE 
    client_id = ?
GROUP BY 
    coffee_code,
    milk
ORDER BY 
    occurrence_count DESC
LIMIT 1
` ;
connection.execute(sql, [itemId], (err, results, fields) => {
  if (err) {
    console.error("Database error:", err);

   return res.status(500).json({ error: "Error en el servidor" }); 
  }
  
  // Your data is inside the 'results' variable
  if (results.length > 0) {
    console.log("Top coffee:", results[0]);
    return res.json(results[0]); 
  } else {
    console.log("No data found.");
    return res.status(404).json({ message: "No data found." });
  }
});
}) */
//gets fav by name
app.get("/rank/:id", async (req, res) => {
  const itemId = req.params.id;
  console.log("Received ID:", itemId);
  const sql = `SELECT coffee_orders.coffee_code,coffee_orders.client_id, coffee_orders.milk, coffee_ID.name, coffee_ID.coffee_code,
 COUNT(*) AS occurrence_count
FROM coffee_orders
LEFT JOIN 
	coffee_ID
ON coffee_orders.coffee_code = coffee_ID.coffee_code

WHERE 
    client_id = ?
GROUP BY 
    coffee_orders.coffee_code,
    coffee_orders.client_id,
    coffee_orders.milk,
    coffee_ID.name
ORDER BY 
    occurrence_count DESC
LIMIT 1
`;
  connection.execute(sql, [itemId], (err, results, fields) => {
    if (err) {
      console.error("Database error:", err);

      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Your data is inside the 'results' variable
    if (results.length > 0) {
      console.log("Top coffee:", results[0]);
      return res.json(results[0]);
    } else {
      console.log("No data found.");
      return res.status(404).json({ message: "No data found." });
    }
  });
});
//gets all the orders from today
app.get("/orders", async (req, res) => {
  const sql =
    "SELECT * FROM coffee_orders WHERE DATE(date_order) = CURRENT_DATE ORDER BY date_order";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get the latest order from today
app.get("/orders/latest", async (req, res) => {
  const sql =
    "SELECT * FROM coffee_orders WHERE DATE(date_order) = CURRENT_DATE ORDER BY id DESC LIMIT 1 ";
  connection.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.json({ latestOrder: null });

    // Enviamos el objeto de la última orden
    return res.json({ latestOrder: data[0] });
  });
});
//delete lastest order
app.delete("/orders/:id", async (req, res) => {
  // Capturamos el número que viene en la URL usando req.params
  const orderId = req.params.id;

  const sql = "DELETE FROM coffee_orders WHERE id = ?";

  connection.query(sql, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);

    return res.json({
      message: `Orden number ${orderId} deleted successfully`,
      affectedRows: result.affectedRows,
    });
  });
});

//post favorite order to db
app.post("/orders/:id", async (req, res) => {
  //  console.log('Backend received params.id:', req.params.id);
  //console.log('Backend received body:', req.body);
  try {
    const clientId = req.params.id;
    const { coffee, milk, today } = req.body;
    const date_order = req.body.created_at || req.body.today;

    const milk_option = milk === "NM" ? null : milk;

    if (!clientId || clientId === "undefined") {
      return res.status(400).json({ error: "Client ID parameter is required" });
    }

    if (!coffee) {
      return res.status(400).json({ error: "Coffee item is required" });
    }
    //create the new order function call

    createOrder(coffee, clientId, date_order, milk_option, (results) => {
      if (!results || !results.success) {
        // Send error as JSON
        return res
          .status(500)
          .json({ error: results?.message || "Server error" });
      }
      // Return JSON instead of plain text res.send()
      return res.status(201).json({ message: results.message });
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

//delete clients order by id
app.delete("/orders/:id", (req, res) => {
  try {
    eraseLastOrder(req.params.id, (results) => {
      if (!results.success) {
        throw new Error(results.message);
      }
      res.send(results.message);
    });
    //
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
  //
});
///post to db working!
app.post("/monks", (req, res) => {
  try {
    //read the user input to pass to the function
    const coffee_option = req.body.coffee;
    let milk_option = req.body.milk;
    if (milk_option === "NM") {
      milk_option = null;
    }
    const date_order = req.body.date;
    const client_id = Number(req.body.name);
    //create the new order function call

    createOrder(
      coffee_option,
      client_id,
      date_order,
      milk_option,
      (results) => {
        if (!results.success) {
          return res.status(500).send(results.message);
        }
        return res.send(results.message);
      },
    );
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
});
//put request creates a new client in the db
app.put("/monks/:id/:name", (req, res) => {
  try {
    const name = req.params.name;
    const client_id = Number(req.params.id);
    createClient(client_id, name, (results) => {
      if (!results.success) {
        return res.status(500).send(results.message);
      }
      return res.send(results.message);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.patch("/monks/:id/:cpd/:dob", (req, res) => {
  try {
    const monks_id = req.params.id;
    const coffee_per_day = req.params.cpd;
    const dob = req.params.dob;
    updateClient(coffee_per_day, dob, monks_id, (results) => {
      if (!results.success) {
        return res.status(500).send(results.message);
      }
      return res.send(results.message);
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

//functions for each request

//patch-> updates clients with dob and coffees per day?
function updateClient(cpd, dob, id, callback) {
  const sql = `UPDATE clients SET coffees_per_day = ?, dob = ? WHERE monks_id = ?`;
  connection.query(sql, [cpd, dob, id], (error, results) => {
    console.log(error);
    console.log(results);
    if (error) {
      return callback({
        success: false,
        message: `Failed to update with message: ${error.message}`,
      });
    }
    callback({
      success: true,
      message: `Successfully updated ${results.affectedRows} row(s)`,
    });
  });
  return 0;
}

//delete->function use in delete the last order by id
function eraseLastOrder(id, callback) {
  const sql = `DELETE FROM coffee_orders WHERE id = ? `;
  // console.log(`Deleting order with id ${id}`)
  connection.query(sql, [id], (error, results) => {
    console.log(error);
    console.log(results);
    if (error) {
      return callback({
        success: false,
        message: `Failed to delete with message: ${error.message}`,
      });
    }
    callback({
      success: true,
      message: `Successfully deleted ${results.affectedRows} row(s)`,
    });
  });
}
//post->create new order in db using form in html
function createOrder(coffee_code, client_id, date_order, milk, callback) {
  const sql = `INSERT INTO coffee_orders (coffee_code, client_id, date_order, milk) VALUES (?,?,?,?)`;
  connection.query(
    sql,
    [coffee_code, client_id, date_order, milk],
    (error, results) => {
      if (error) {
        return callback({
          success: false,
          message: `Failed to create new order with message: ${error.message}`,
        });
      }
      callback({
        success: true,
        message: `Order successfully made for ${client_id}`,
      });
    },
  );
  return 0;
}

//put-> creates a new client in the databse
function createClient(id, client_name, callback) {
  const sql = `INSERT INTO clients (monks_id, name) VALUES (?,?)`;
  connection.query(sql, [id, client_name], (error, results) => {
    if (error) {
      return callback({
        success: false,
        message: `Failed to create client with message: ${error.message}`,
      });
    }
    callback({
      success: true,
      message: `Client successfully added to our system ${client_name}`,
    });
  });
  return 0;
}
