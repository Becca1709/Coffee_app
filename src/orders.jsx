//server ui to fetch and post the latest orders. with a a better front end
import React , { useState , useEffect } from "react"
import { useNavigate } from "react-router";
import ReactDOM from 'react-dom'
import './App.css'

export function OrderView(){
      const [data, setData] = useState([]);
      const orders_data=Array.isArray(data) ? data.map(d => ({ id: d.client_id, date: d.date_order, coffe: d.coffee_code })) : [];

const today = new Date().toISOString().split("T")[0];
//fetch info from data
  useEffect(()=>{
    fetch('http://localhost:3008/orders')
    .then(response => response.json())
    .then(data=>{console.log(data)
        setData(data); 
    })
    .catch(error => console.error("Error cargando datos:", error))
  },[]) ;
//each new order create alert.


return(

    <main>
<section>
    <h1><p>time {today}</p></h1>
    <table>
        <tr>
            <td>
            client_id
            </td>
             <td>
            coffee_code
            </td>
        </tr>
         {orders_data.map((order, index) => (
      <tr key={index}>
        <td>{order.id}</td>
        <td>{order.coffe}</td>
      </tr>
    ))}
    </table>
   
</section>
    </main>
)

}