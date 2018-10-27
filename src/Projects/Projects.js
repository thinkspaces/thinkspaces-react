import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import ProjectCard from '../Project/Card';
import './Projects.css';

const headerStyle = {
    "margin-bottom" : "20px",
}

const projects = (props) => {
    return (
        <div>
            <h2 style={headerStyle}>All Projects</h2>
            <Row className="cardGroup">
                <Col lg>
                    <ProjectCard title="Homecooked" shortname="homecooked"
                     image='https://i.imgur.com/1zb0koc.jpg'
                     text = "A social dining app that lets you book homecooked meals made by people in your neighborhood"
                     />
                 </Col>
                <Col lg>
                    <ProjectCard title="Visionary Health" shortname="visionaryhealth"
                    image = 'https://i.imgur.com/PKpZUP9.jpg'
                    text = "An AI/Healthcare startup developing the first automated imaging screening platform"
                    />
                </Col>
                <Col lg>
                    <ProjectCard title = "Pearl" shortname="pearl"
                    image = 'https://i.imgur.com/a51qJgk.jpg'
                    text = "A biometric technology startup bringing the first global cloud-based biometric authentication platform to market."
                    />
                </Col>
            </Row>

        </div>
    );
}

export default projects;