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
                     />
                 </Col>
                <Col lg>
                    <ProjectCard title="Visionary Health" shortname="visionaryhealth"
                    image = 'https://i.imgur.com/PKpZUP9.jpg'
                    />
                </Col>
                <Col lg>
                    <ProjectCard title = "Pearl" shortname="pearl"
                    image = 'https://i.imgur.com/a51qJgk.jpg'
                    />
                </Col>
            </Row>
            <Row className="cardGroup">
                <Col lg>
                    <ProjectCard />
                </Col>
                <Col lg>
                    <ProjectCard />
                </Col>
                <Col lg>
                    <ProjectCard />
                </Col>
            </Row>
            <Row className="cardGroup">
                <Col lg>
                    <ProjectCard />
                </Col>
                <Col lg>
                    <ProjectCard />
                </Col>
                <Col lg>
                    <ProjectCard />
                </Col>
            </Row>
        </div>
    );
}

export default projects;