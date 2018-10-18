import React from 'react';

import {
    Button,
    Row,
    Col
} from 'reactstrap';

import ProjectCard from '../Project/Card';
import '../Projects/Projects.css'

const headerStyle = {
    "margin" : "50px 0px 50px 0px",
    "text-align": "center",
}

const buttonStyle = {
    "margin" : "20px 10px",
}

const trendingStyle = {
    "padding" : "5px",
}


const home = (props) => {
    return (
        <div>
            <div style={headerStyle}>
                <h2>Thinkspaces</h2>
                <h4>Find and work on projects started by Yalies</h4>
                <Button href="/about" style={buttonStyle} outline>Learn more</Button>
                <Button href="/projects" style={buttonStyle} color="danger">Browse Projects</Button>
            </div>
            <h2 style={trendingStyle}><span role="img" aria-label="Fire">🔥</span> Trending</h2>
            <Row className="cardGroup">
                <Col lg><ProjectCard /></Col>
                <Col lg><ProjectCard /></Col>
                <Col lg><ProjectCard /></Col>
            </Row>
        </div>
    );
}

export default home; 