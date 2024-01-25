# Monitoring System Backend

Welcome to the backend of our Monitoring System – a robust solution built with TypeScript on the PostgreSQL database. This system serves as an Admin Monitoring tool, enabling administrators to seamlessly invite users, manage user activities, and create dedicated buckets for specific users.

## Features

- **Database:** PostgreSQL is used as the database to ensure reliability and efficient data management.

- **Platform:** The backend is developed in TypeScript, providing a type-safe environment for improved code quality and maintainability.

- **User Management:** Administrators have the capability to invite users, handle user-related tasks, and create specific buckets tailored to individual user needs.

- **Middleware:** JWT (JSON Web Token) is employed as middleware, enhancing security and facilitating secure communication within the system.

- **Communication:** Node Mailer is integrated to handle user invitations and facilitate a robust password reset system.

## Prerequisites

Before diving into the project, make sure your system meets the following requirements:

- **Node.js:** Ensure that Node.js is installed on your system.

- **PostgreSQL:** PostgreSQL should be set up and running on your machine.

## Getting Started

1. **Install Dependencies:**

   ```bash
    yarn
   ```

2. **Create Environment File:**
   Create a .env file based on the provided .env.example file. Update the variables in the .env file with your specific configuration.

3. **Create Database:**
   Create the corresponding database in your PostgreSQL system as mentioned in the .env file.

4. **Run Migrations:**
   Execute the database migrations and set up the necessary schema.

   ```bash
    yarn run:migrations
   ```

5. **Build the Project:**
   Compile the TypeScript code.

   ```bash
    yarn compile
   ```

6. **Start the Project:**
   Run the project in development mode.
    ```bash
     yarn dev
    ```
