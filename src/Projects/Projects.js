import React, { Component } from 'react';

// database
import { db } from "../firebase";

import store from '../store';
import { observer } from 'mobx-react';

// custom components
import { Row, Col} from 'reactstrap';
import ProjectCard from '../Project/Card';

// styles
import './Projects.css';
const headerStyle = {
    "margin-bottom" : "20px",
}


class projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPending: true,
            projects: [],
            isError: false,
        }
    }

    componentDidMount = async () => {
        let projects = await db.getProjects();
        this.setState({ projects });
    }

    // componentDidMount() {
    //     // connect to firebase
    //     const db = Firebase.firestore()

    //     // Disable deprecated features
    //     db.settings({ timestampsInSnapshots: true });

    //     // retrieve everythinng
    //     db.collection("projects").get()
    //     .then((querySnapshot) => {
    //         // set state and switch off pendinng
    //         this.setState({
    //             projects: querySnapshot,
    //             isPending: false
    //         })
    //     })
    //     .catch (function(error) {
    //         // set state
    //         // this.setState({
    //         //     isError: true,
    //         // })

    //         // write error to console
    //         console.log("Error getting projects: ", error);
    //     });
    // }

    render () {
        const { projects } = this.state;

        return (
            <div>
                {projects.map(p => (
                    <ProjectCard
                        title={p.title}
                        image={p.images[0]}
                        text={p.about}
                    />
                ))}
                <h2 style={headerStyle}>All Projects</h2>
                <Row className="cardGroup">
                    <Col lg>
                        <ProjectCard title="MovesU" shortname="moves"
                            image='https://i.imgur.com/tslXFr4.jpg'
                            text="A fun, social events app for and driven by college students. For events of any size, from small gatherings to massive parties."
                        />
                    </Col>
                    <Col lg>
                        <ProjectCard title="Snackpass" shortname="snackpass"
                            image='https://i.imgur.com/uy5sbwL.jpg'
                            text="Get lit discounts and never wait in line again"
                        />
                    </Col>
                    <Col lg>
                        <ProjectCard title="Verb" shortname="verb"
                            image='https://i.imgur.com/ClqgMEf.jpg'
                            text="We believe people should have the energy to feel focused and alive every day."
                        />
                    </Col>
                </Row>
                <Row className="cardGroup">
                    <Col lg>
                        <ProjectCard title="Homecooked" shortname="homecooked"
                            image='https://i.imgur.com/1zb0koc.jpg'
                            text="A social dining app that lets you book homecooked meals made by people in your neighborhood"
                        />
                    </Col>
                    <Col lg>
                        <ProjectCard title="Visionary Health" shortname="visionaryhealth"
                            image='https://i.imgur.com/PKpZUP9.jpg'
                            text="An AI/Healthcare startup developing the first automated imaging screening platform"
                        />
                    </Col>
                    <Col lg>
                        <ProjectCard title="Pearl" shortname="pearl"
                            image='https://i.imgur.com/a51qJgk.jpg'
                            text="A biometric technology startup bringing the first global cloud-based biometric authentication platform to market."
                        />
                    </Col>
                </Row>
                <Row className="cardGroup">
                    <Col lg>
                        <ProjectCard title="Divvy|Campus" shortname="divvy"
                            image='https://i.imgur.com/isyYghS.jpg'
                            text="We put together all the apps you need as a student to enjoy the college experience. "
                        />
                    </Col>
                    <Col lg>
                        <ProjectCard title="Foosbuddy" shortname="foosbuddy"
                            text="Creating a foosball training aid that appeals to professional players."
                        />
                    </Col>
                    <Col lg>
                        <ProjectCard title="Dualflo" shortname="dualflo"
                            image='https://i.imgur.com/wCBwmoA.jpg'
                            text="Developing a novel device to address a significant complication associated with cardiopulmonary bypass."
                        />
                    </Col>
                </Row>

            </div>
        );
    }
}

export default observer(projects)
