#!/bin/bash
echo "----------------------------------------------------------"
echo "Starting setup..."

#Update packages
apt-get update

#Install Git
echo "----------------------------------------------------------"
echo "Installing git..."

apt-get install -y git
echo "----------------------------------------------------------"
echo "Installing nano..."

apt-get install -y nano

#Install curl
echo "----------------------------------------------------------"
echo "Installing curl..."

apt-get install -y curl

#Download and install Node.js from https://deb.nodesource.com/
echo "----------------------------------------------------------"
echo "Dowloading node..."

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
echo "----------------------------------------------------------"
echo "Installing node..."

apt-get install nodejs -y

#Install Postgresql and set up the database
echo "----------------------------------------------------------"
echo "Installing postgresql..."

apt-get install -y postgresql

echo "----------------------------------------------------------"
echo "Starting Postgresql service..."

service postgresql start

#Wait a few seconds to ensure Postgresql is fully started
sleep 5 

#Ensure the postgres user has a password for psql command to work
echo "----------------------------------------------------------"
echo "Setting password for postgres user"

su - postgres -c "psql -c \"ALTER USER postgres PASSWORD 'Admin';\""

echo "----------------------------------------------------------"
echo "Creating database in psql"

su - postgres -c "psql -c \"CREATE DATABASE notes;\"" || { echo "Failed to create database"; exit 1; }

#Clone GitHub repository from https://github.com/marytrini/challenge.git
GITHUB_REPO_URL=https://github.com/marytrini/challenge.git
echo "----------------------------------------------------------"
echo "Cloning the GitHub repository..."

git clone $GITHUB_REPO_URL

#Navigate the directory and set on the backend root to install dependencies
cd challenge/backend
echo "----------------------------------------------------------"
echo "Installing backend dependencies"
npm install

#Navigate the directory and set on the frontend root to install dependencies
cd /challenge/frontend/client
echo "----------------------------------------------------------"
echo "Installing frontend dependencies"
npm install

echo "Setup complete!"





