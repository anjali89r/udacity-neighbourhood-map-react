import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import VenueList from './components/VenueList';
class App extends Component {
    state = {
      venues: [],
      map: '',
      infowindow: '',
      prevmarker: ''
    }
    componentDidMount() {

      this.getVenues();

    }
      renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBSauZRCyR4AVkR294nPz-PQlz_Ybr5-0M&callback=initMap")
        window.initMap = this.initMap
      }

      //method to get the venues from FourSquare API
      getVenues = () => {
        const endpoint = "https://api.foursquare.com/v2/venues/explore?";
        const parameters = {
          client_id: "5X0A1QW5XH4FBYHC2Y2WGZAIHITJLNGUTPFVUMYWUS04Q1ZH",
          client_secret: "1BCBPNHQF4FT0OGWCYDDTARWOTPJTAWWBNLSM14NCBFLQ0W4",
          query: "food",
          near: "Mumbai",
          v: "20182511"

        }
        axios.get(endpoint + new URLSearchParams(parameters))
        .then(resp => {
          console.log("resp: ", resp)
          this.setState({
            venues: resp.data.response.groups[0].items
          },this.renderMap())

        })
        .catch(error => {
          console.log("error: ", error)
        })

      }
      /**
     * Initialise the map once the google map script is loaded
     */
      initMap = () => {
        var self = this;
        var map = new window.google.maps.Map(document.getElementById('map'), {
          // center: {lat: 20.593684, lng: 78.96288},
          center: {lat: 19.075983, lng: 72.877655},
          zoom: 12,
          mapTypeControl: false
        });


        var infowindow = new window.google.maps.InfoWindow({});
        window.google.maps.event.addListener(infowindow, 'closeclick', ()=>{
          this.closeInfoWindow();
      });

      this.setState({
          map: map,
          infowindow: infowindow
      });

        window.google.maps.event.addDomListener(window, "resize", () => {
          var center = map.getCenter();
          window.google.maps.event.trigger(map, "resize");
          this.state.map.setCenter(center);
      });

      window.google.maps.event.addListener(map, 'click', () => {
        this.closeInfoWindow();
    });
    var alllocations = [];

    this.state.venues.forEach(function (location) {
        var heading = location.venue.name + ' - ' + location.venue.categories[0].name;
        var marker = new window.google.maps.Marker({
            position: {lat: location.venue.location.lat,
                      lng: location.venue.location.lng },
            animation: window.google.maps.Animation.DROP,
            map: map,
            title: location.venue.name
        });

        marker.addListener('click', ()=> {
          console.log("tis: ", self)
            self.openInfoWindow(marker);
        });

        location.heading = heading;
        location.marker = marker;
        location.display = true;
        alllocations.push(location);
    });
    this.setState({
        venues: alllocations
    });
  }
  /**
     * Open the infowindow for the marker
     */
    openInfoWindow = (marker) => {
      this.closeInfoWindow();
      this.state.infowindow.open(this.state.map, marker);
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      this.setState({
          'prevmarker': marker
      });
      this.state.infowindow.setContent('Loading Data...');
      this.state.map.setCenter(marker.getPosition());
      this.state.map.panBy(0, -200);
      this.getMarkerInfo(marker);
  }
  /**
     * Retrive the location data from the foursquare api for the marker and display it in the infowindow
     */
  getMarkerInfo = (marker) => {
console.log("get info")
    var clientId = "5X0A1QW5XH4FBYHC2Y2WGZAIHITJLNGUTPFVUMYWUS04Q1ZH";
    var clientSecret = "1BCBPNHQF4FT0OGWCYDDTARWOTPJTAWWBNLSM14NCBFLQ0W4";
    var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
    fetch(url)
        .then(
            (response) => {
                if (response.status !== 200) {
                    this.state.infowindow.setContent("Sorry data can't be loaded");
                    return;
                }

                // Examine the text in the response
                response.json().then((data)=> {
                    console.log("data: ", data)
                    var details = data.response.venues[0];

                    this.state.infowindow.setContent('<b>'+details.name + '-' + details.categories[0].name +'</b><br>'+ details.location.address + '<br>' + details.location.crossStreet +'<br><a href="https://foursquare.com/v/'+ details.id +'" target="_blank">More Info</a>');
                });
            }
        )
        .catch(function (err) {
            this.state.infowindow.setContent("Sorry data can't be loaded");
        });
}
/**
     * Close the infowindow for the marker

     */
closeInfoWindow = () => {
  if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
  }
  this.setState({
      'prevmarker': ''
  });
  this.state.infowindow.close();
}

  render() {

    return (
      <main>

        <VenueList key="100"
        getVenues={this.getVenues}
        venues={this.state.venues}
        openInfoWindow={this.openInfoWindow}
        closeInfoWindow={this.closeInfoWindow}/>

        <div id="map">

        </div>
      </main>

    );
  }
}
/**
 * Load the google maps Asynchronously
 * @param {srcUrl} url of the google maps script
 */
    function loadScript(srcUrl) {
      var firstScriptIndex = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
      script.src = srcUrl;
      script.async = true;
      script.defer = true;
      firstScriptIndex.parentNode.insertBefore(script, firstScriptIndex)
    }

export default App;
