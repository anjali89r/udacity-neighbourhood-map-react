
import React from 'react';

class VenueItem extends React.Component {

    render() {
        return (
            <li role="button" className="box" tabIndex="0" onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)} onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>{this.props.data.heading}</li>
        );
    }
}

export default VenueItem;
