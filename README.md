# Tech Test for Ecologi 

Create a chart displaying the number of trees planted per day since launch. Bonus points for being able to filter the view to specific times (e.g. only show the last month of tree planting). This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Built With

* [React](https://reactjs.org/)  
* [React-Spinner](https://www.npmjs.com/package/react-spinners)
* [React Query](https://react-query.tanstack.com/)
* [Recharts](https://recharts.org/en-US/exampless)
* [Styled-Components](https://styled-components.com/)
* [Loadash](https://lodash.com/)


## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features 

### Loading Indicator 
### Filter by day or month 
### Animated chart with Recharts 
### Styled-Components styling 


## Things to Note

Links to articles and stack overflow posts I have used are added as comments into the code.

I think some of the values in the data must be strings...when added up, the total values for some days return as giant strings rather than numbers, which didn't work with the chart so I have filtered only number types. See image:

![string-data](/public/strange-data.JPG)


## Improvements

App.js code (styles, API call, & data handling) could potentially be separated out into separate files for better readability.

The function that returns the day/month total could definitely be minified or combined into one function

I would add functionality to filter by a specific month

Add tests with React Testing Library 

## API Improvements 

Have the server return the date of purchase and time of purchase separately to minimise the amount of data converting required 








