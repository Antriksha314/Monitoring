# Monitoring Frontend

## Overview

This is the frontend application for the Monitoring Dashboard. It is built using React with Next.js, and it utilizes React Query for API data fetching. The application is designed to serve as an admin dashboard where users can be invited and organized into buckets.

## Features

- **React Query**: The application utilizes React Query for efficient API data fetching, providing a seamless experience for users.

- **Next.js**: The frontend is built on the Next.js platform, providing server-side rendering and easy routing for a smoother user experience.

- **Higher Order Components (HOC)**: The application employs Higher Order Components to enhance the modularity and reusability of components.

- **Authentication**: Authentication has been integrated into the application. Routes are protected to ensure secure access to the admin dashboard.

## Prerequisites

Before setting up the project, ensure the following:

- The backend server must be running before starting the frontend project.

- Create a `.env` file in the root directory of the project and add the required variables. You can use the provided `.env.example` file as a reference.

## Setup Instructions

Follow the steps below to set up and run the Monitoring Frontend:

1. Install project dependencies using the following command:

   ```bash
    yarn install
   ```
2. Install project dependencies using the following command:

   ```bash
    yarn install
   ```

3. Create a .env file in the project's root directory and add the necessary environment variables based on the provided .env.example file.

4. Ensure that the backend server is up and running.

5. Start the project using the following command:

   ```bash
    yarn dev
   ```
This will launch the development server, and you can access the application in your browser at http://localhost:3000.