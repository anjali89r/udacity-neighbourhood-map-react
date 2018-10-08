import React, {Component} from 'react';

import VenueItem from './VenueItem';

class VenueList extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            query: ''

        };

        this.filterLocations = this.filterLocations.bind(this);

    }

    /**
     * Filter Locations based on user query
     */
    filterLocations(event) {
        console.log("filtered")
        this.props.closeInfoWindow();
        const {value} = event.target;
        var venues = [];
        console.log('in filtered props: ', this.props.venues)
        this.props.venues.forEach(function (location) {
            if (location.heading.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                venues.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            venues: venues,
            query: value
        });
    }

    componentDidMount() {
        this.openNav();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.venues !== nextProps.venues) {
          this.setState({
            venues: nextProps.venues
          });
        }
      }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("map").style.marginLeft = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("map").style.marginLeft = "0";
    }

    render() {
        var Venuelist = this.state.venues.map(function (listItem, index) {
            return (
                <VenueItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
            );
        }, this);

        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <input role="search" aria-labelledby="filter" id="search-field" className="search-field" type="text" placeholder="food places"
                    value={this.state.query} onChange={this.filterLocations}/>
                    <span className="closebtn" onClick={this.closeNav}>&times;</span>
                    <span className="title">Mumbai Eateriess</span>
                    <ul>
                      {Venuelist}
                    </ul>
                </div>
                <span className="list-span" onClick={this.openNav}>&#9776; </span>

            </div>
        );
    }
}

export default VenueList;
