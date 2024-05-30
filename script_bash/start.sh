#!/bin/bash

# Print start message
echo "Starting setup..."

# Define variables
GITHUB_REPO_URL="https://github.com/ensolvers-github-challenges/Salazar-c836e0.git"
PROJECT_DIR="Maria_Salazar_challenge"

# Clone the GitHub repository
echo "Cloning the repository from $GITHUB_REPO_URL..."
git clone $GITHUB_REPO_URL

# Check if the cloning was successful
if [ $? -ne 0 ]; then
  echo "Failed to clone the repository"
  exit 1
fi

# Navigate to the project directory
cd $PROJECT_DIR || { echo "Project directory not found!"; exit 1; }

# Navigate to the backend directory
cd backend || { echo "Backend directory not found!"; exit 1; }

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Check if the installation was successful
if [ $? -ne 0 ]; then
  echo "Failed to install backend dependencies"
  exit 1
fi

# Set up the database
echo "Setting up the database..."
# Customize the following lines based on your PostgreSQL setup
DB_NAME="your_database_name"
DB_USER="your_database_user"
DB_PASSWORD="your_database_password"

# Export environment variables
export DB_NAME=$DB_NAME
export DB_USER=$DB_USER
export DB_PASSWORD=$DB_PASSWORD

# Create the database if it doesn't exist
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" || { echo "Failed to create database"; exit 1; }

# Run Sequelize migrations (adjust based on your project setup)
npx sequelize-cli db:migrate

# Check if the migrations were successful
if [ $? -ne 0 ]; then
  echo "Failed to run migrations"
  exit 1
fi

# Start the backend server in development mode
echo "Starting backend server..."
npm run dev &

# Store the backend server process ID
BACKEND_PID=$!

# Navigate to the frontend directory
cd ../client || { echo "Client directory not found!"; exit 1; }

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Check if the installation was successful
if [ $? -ne 0 ]; then
  echo "Failed to install frontend dependencies"
  exit 1
fi

# Start the frontend server
echo "Starting frontend server..."
npm start &

# Store the frontend server process ID
FRONTEND_PID=$!

# Print success message
echo "Setup complete! Backend PID: $BACKEND_PID, Frontend PID: $FRONTEND_PID"

# Wait for the backend and frontend processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID
