# Guide to Setting Up the Project

Follow these steps to set up the project and prepare your environment:

## Clone this repo

Clone this repository to your local machine.

## Install Dependencies

Run `npm install` in the terminal to install the required dependencies.

## Configure Environment Variables

Create a new `.env` file in the project root directory and add the following keys:

```
DISCORD_ID=
DISCORD_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000/

DATABASE_URL=
```

## Set Up Planetscale Database

Signup for a [Planetscale](https://planetscale.com/) account and create a new database

## Connect Planetscale Database with Prisma

Click the "Connect" button in your Planetscale account and ensure the dropdown is set to "Prisma."

## Add Database URL to Environment File

Copy the `DATABASE_URL` value from Planetscale and paste it in your `.env` file.

## Register a New Discord Application

Signup for a Discord account, navigate to [Discord Dev Portal](https://discord.com/developers/applications), and create a new application

## Configure `DISCORD_ID`

Click on the "OAuth2" navigation item, copy the `CLIENT ID`, and paste it as the value of `DISCORD_ID` in your .env file.

## Configure `DISCORD_SECRET`

Click on the "Reset Secret" button, copy the generated value, and paste it as the value of `DISCORD_SECRET` in your `.env` file.

## Add Redirect URL for Discord

Add a new redirect link and paste the following URL into the input field:
`http://localhost:3000/api/auth/callback/discord`

## Generate `NEXTAUTH_SECRET`

Open a terminal and run the following command: `openssl rand -base64 32`
Copy the output and paste it as the value of `NEXTAUTH_SECRET` in your `.env` file.

## Push Prisma Schema to Database

Run the following command in the terminal: `npx prisma db push`

## Start the Development Server

Run `npm run dev` to start the development server.

## Test Your Setup

Try to log in to the application. If you can access the dashboard screen, your setup is complete.
