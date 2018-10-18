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
                    <ProjectCard title="Homecooked" shortname="homecooked"/>
                </Col>
                <Col lg>
                    <ProjectCard/>
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