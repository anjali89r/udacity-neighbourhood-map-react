# Neighborhood-Map-React
A single-page web application, built using the React framework, that displays a Google Map of an area and various points of interest. Users can search all included landmarks and, when selected, additional information about a landmark is presented from the FourSquare APIs.

## Features

1. Type into the filter/search box to filter the shown locations on the map.
2. Click on any marker to see the location details fetched from the [FourSquare APIs](https://developer.foursquare.com/).

## How to run the project in Development Mode
The project uses [Node.js >= 6.x](https://nodejs.org/en/) and the [Create-React-App starter code](https://github.com/facebookincubator/create-react-app).

After Node is installed in your system, follow the below steps.

1. Download or clone this repository
2. Install all project dependencies with npm install
3. Development Mode: start the development server with npm start
4. Production Mode: create a production build with npm run build, which can then be run by pointing a web server at the build directory (for example, serve -s build) and opening it in a browser.

A new browser window open automatically displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

udated version

```
const facebookProfile = {
    name: "Anj",
    messages: ["kjfh", "kjfh", "iwe"],
    postMessage: function(message){
        __~blank~__.messages.push(message);
    }
};
```
