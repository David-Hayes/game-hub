# Game hub

This is a work in progress!

Game hub is a personal project. For some reason I was thinking about all the different games I've played and how I would rate them, I then thought, why not make an application with a database to contain this information?

The hub uses IGDB (Twitch) API for the the game information and a Firebase DB to store ratings.

## Technical

Gamehub is a Next.js application and is designed to be hosted on Netlify.

Firebase is used for authentication and firestore for the database.
## Scripts

This project has been developed using [Netlify's Dev Server](https://www.netlify.com/products/dev/).

Once you have the CLI installed you can run the following command which starts the react front end and lambda functions.

`netlify dev`

### Environment variables
To run Gamehub you'll need IGDB Api Client and Secret keys along with a Firebase web app.

**.env**

`IGDB_CLIENT`

`IGDB_SECRET`

**.env.local**

`NEXT_PUBLIC_FIREBASE_APIKEY`

`NEXT_PUBLIC_FIREBASE_AUTHDOMAIN`

`NEXT_PUBLIC_FIREBASE_PROJECTID`

`NEXT_PUBLIC_FIREBASE_APPID`

## Contribution
Contribution is welcome, please get in touch if you'd like to help the project.