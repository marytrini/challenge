# Note Web App

This is a simple web application for creating, archiving, and reading notes. It is built using React.js for the frontend and Node.js, Express, PostgreSQL, and Sequelize for the backend.

## Features

- Create, archive, edit and delete notes
- Automated setup with a bash script

## Technologies Used

- Frontend: React.js v^18.3.1, Tailwindcss v^3.4.3
- Backend: Node.js v20.9.0, Express v^4.19.2
- Database: PostgreSQL v^8.11.5
- ORM: Sequelize v^6.37.3

## Prerequisites

- Node.js and npm
- PostgreSQL
- Git

## Setup Instructions

### Automated Setup

1. **Clone the Repository and Run the Setup Script**

   ```bash
   git clone https://github.com/marytrini/challenge.git
   cd challenge
   chmod +x setup.sh
   ./setup.sh

This script will:
- Download and install Node.js
- Install Git
- Install Postgresql and set up the database
- Clone the repository
- Install backend and frontend dependencies

After the setup is complete you may proceed to start the backend server and the frontend server:

- Navigate to /challenge/backend and execute the script:
    - npm run dev (for development)
    - or npm start

- Navigate to /challenge/frontend and execute the script:
    - npm start

And now you have completed the process to run this app successfully!

### Manual Setup

1. **Clone the Repository**
git clone https://github.com/marytrini/challenge.git
cd challenge

2. **Backend Setup**
- Navigate to the backend directory and install dependencies:

    cd backend
    npm install

- Set up the PostgreSQL database:

# Create the database (customize with your actual DB details)
psql -U your_database_user -c "CREATE DATABASE notes;"

- Run Sequelize to set up the schema:

    npx sequelize-cli db:migrate

- Start the backend server:

# For development mode
npm run dev

# For production mode
npm start

3. **Frontned Setup**

- Navigate to the frontend directory and install dependencies:
    cd ../client
    npm install

- Start the frontend server:
    npm start

Notes: This README file provides a comprehensive overview and detailed setup instructions for your web application, making it easier for users and contributors to get started.