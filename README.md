# Game hub

This is a work in progress!

Game hub is a personal project. For some reason I was thinking about all the different games I've played and how I would rate them, I then thought, why not make an application with a database to contain this information?

The hub uses IGDB (Twitch) API for the the game information and a Firebase DB to store ratings.

## Technical

The app is based on create-react-app, using TailwindCSS and is designed to be hosted on Netlify.

Firebase is used for authentication and as a DB.
## Scripts

This project has been developed using [Netlify's Dev Server](https://www.netlify.com/products/dev/).

Once you have the CLI installed you can run the following command which starts the react front end and lambda functions.

`netlify dev`