/**
 * Created by manish on 6/1/18.
 */
import React from 'react';

class VenueItem extends React.Component {
    /**
     * Render function of LocationItem
     */
    render() {
        return (
            <li role="button" className="box" tabIndex="0" onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)} onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}>{this.props.data.heading}</li>
        );
    }
}

export default VenueItem;
