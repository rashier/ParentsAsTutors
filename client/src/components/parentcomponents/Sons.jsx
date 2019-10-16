import React, { Component } from "react";
import { Link } from 'react-router-dom';
import RouteServices from '../../services/RouteService'

class Sons extends Component {
    constructor(props) {
    super(props);
    this.route = new RouteServices();
    }    
    render() {
    return (
        <React.Fragment>
        <div className="teacher-container">
        
        </div>
        </React.Fragment>
    );
    }
}

export default Sons;
