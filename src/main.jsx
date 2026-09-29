import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router";
import { Router, Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";
import { Dashboard } from "./dashboard.jsx";
import { OrderView } from "./orders.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");
/*<Route path="/dashboard/:id" element={<Dashboard />} />*/
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id" element={<App />} />
      <Route path="/orders" element={<OrderView />} />
    </Routes>
  </BrowserRouter>,
);
