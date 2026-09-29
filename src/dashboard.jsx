// here goes the user dashboard 
//client side
//on each new coffee order from the fav or the form create an alert on the server side
import React , { useState , useEffect} from "react"
import ReactDOM from 'react-dom'
import { Container, Button, Alert, Dropdown } from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom"
//import components
import { NewORder } from "../components/neworder"
import {Favorite} from "../components/favorite"

import { useLocation } from 'react-router-dom';

/* <NewORder id={id}/> */
export function Dashboard(){
  const {id: client}=useParams();
  const location = useLocation();
  const { id, name } = location.state || {}; //access passed state

//for testing  console.log("1. URL (client parameter):", client);

    return(
        <main>
     <section id="customer">
   <div className="info">
    <h1>Welcome {name}</h1>
  <Favorite id={id}/>
    <div className='coffee_order'>
    </div>
    </div>
    </section>
          </main>)
}