# Solar Rocket (v1.0)

## Welcome to the BenManage Solar Rocket developer assessment

This is a simple project designed to not only test your React skills, but also to gauge your ability to learn and figure out new things. Don't worry if you encounter something you don't know. Google is your friend 😊.

## Technical information

- This project contains both the server-side and client-side code for this app
- The server-side code is using ExpressJS
- The client-side is using React with MUI and TypeScript

## Getting Started
- Fork this repository and work on your local machine. When you are finished, push your changes and submit the link to your repository.
- You will need to install packages by running `npm i` in the root directory, as well as the client and server directories, in order to get started
- You can run both the client and server simultaneously by running `npm start` in the root directory
- The first time the app runs, the JSON data for the API will be copied to a `/server/.data` directory. If the data for whatever reason gets corrupted, you can refresh the data by safely deleting the `/server/.data` directory and it will be regenerated the next time the server runs.

## Tasks

1. On the "Missions" page you can currently you can sort the data by "Title" or "Date". The "sort direction" button does not work. Make it work so that when clicking the sort button, the order of the sorting is reversed.
1. Add the ability to sort missions by "operator".
1. The weather page currently has no content. We need to show a five-day live weather forecast on this page. You can use https://www.weatherapi.com/ or any other free weather API service to pull the forecast data. Make it look pretty.
1. Someone started creating a dialog to create new missions, but they never finished it (and it doesn't even have the right fields). Update the dialog to create new missions with the necessary data and use the API to save the data so it shows up on the missions page.

## Extra Credit (if you really want to impress us 😊)
- Add the ability for users to modify and delete missions

<br>

<h1 align="center">Good Luck!</h1>