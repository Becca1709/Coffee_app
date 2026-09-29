# Office Coffee Order Manager

A full-stack, responsive web application designed for office environments to streamline coffee orders for the office. Built with React, Vite, Bootstrap, Node.js, Express, and MySQL.

> 🛠️ **Project Status:** *Work in Progress (WIP)* — Currently implements core CRUD functionality: adding new orders directly updates the MySQL database, and existing orders are dynamically fetched and displayed on the front end.

---

## 🌟 Features

* **Add New Orders:** Users can submit order details through a simple interface.
* **Real-Time Data Display:** View current office orders fetched directly from the database.
* **Responsive Interface:** Styled with Bootstrap for seamless use across desktop and mobile devices.
* **RESTful API Backend:** Express server handling client requests and database interactions.

---

## 🛠️ Tech Stack

### Front-End
* **React** (v18+)
* **Vite** (Build tool)
* **React Router** (Client-side routing)
* **Bootstrap** (UI framework & responsive design)

### Back-End
* **Node.js**
* **Express.js**
* **MySQL** (Relational database management)

---

## 💡 Key Learnings & Milestones

As one of my key full-stack projects, this application helped me master several crucial concepts:
* **Environment Variables (`.env`):** First time implementing environment variables to keep sensitive credentials (like database passwords and secret keys) safe and isolated.
* **Git Security (`.gitignore`):** Learning how to configure `.gitignore` properly to prevent pushing sensitive file paths, node modules, and credentials to public repositories.
* **Full-Stack Integration:** Solidified and improved my understanding of end-to-end full-stack communication—connecting a React front-end to a Node/Express REST API and managing persistent data with MySQL.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL Server](https://www.mysql.com/)

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your 
project.
