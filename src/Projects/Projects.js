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
                    <ProjectCard title="MovesU" shortname="moves"
                     image='https://i.imgur.com/tslXFr4.jpg'
                     text = "A fun, social events app for and driven by college students. For events of any size, from small gatherings to massive parties."
                     />
                 </Col>
                <Col lg>
                    <ProjectCard title="Snackpass" shortname="snackpass"
                    image = 'https://i.imgur.com/uy5sbwL.jpg'
                    text = "Get lit discounts and never wait in line again"
                    />
                </Col>
                <Col lg>
                    <ProjectCard title = "Verb" shortname="verb"
                    image = 'https://i.imgur.com/ClqgMEf.jpg'
                    text = "A biometric technology startup bringing the first global cloud-based biometric authentication platform to market."
                    />
                </Col>
            </Row>
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