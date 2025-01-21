<a id="readme-top"></a>

[![MiguelSilva7]](https://github.com/MiguelSilva7)
[![Exely03]](https://github.com/Exely03)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <div>
    <img src="/frontend/src/assets/logo.png" alt="logo" width="80" height="80">
  </div>

<h3 align="center">Infact</h3>

  <p align="center">
Infact is a web application aimed at connecting companies with job seekers. Any user can apply for a job offer through the platform.
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<div>
    <img src="/frontend/src/assets/screenshot.png" alt="screenshot" width="800" height="400">
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project is built with the following technologies:

- **Frontend**:

  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Zustand](https://zustand.pmnd.rs/)

- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Sequelize](https://sequelize.org/)
  - [MySQL](https://www.mysql.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

Make sure thse tools are installed on your computer

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:EpitechMscProPromo2027/T-WEB-501-LYO_23.git
   ```
2. Install NPM packages
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Configure .env

   ```js
   DB_HOST = your - database - host;
   DB_USER = your - database - username;
   DB_PASSWORD = your - database - password;
   DB_NAME = your - database - name;
   PORT = your - server - port;
   JWT_SECRET = your - jwt - secret;
   ```

4. Synchronize your database by using the syncModels() function in server.js

5. Start the backend server

```sh
   cd backend
   npm start
```

5. Start the react client

```sh
   cd frontend
   npm start
```

Now, the backend should be running on http://localhost:<PORT> and the frontend on http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Project Link: [https://github.com/EpitechMscProPromo2027/T-WEB-501-LYO_23](https://github.com/EpitechMscProPromo2027/T-WEB-501-LYO_23)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
