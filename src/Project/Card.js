import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

const ProjectCard = (props) => {

    let shortname = "#"
    let title = "Card title"
    if (props.shortname) { shortname = "projects/" + props.shortname }
    if (props.title) { title = props.title }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{ title }</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                </CardBody>
                <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <CardLink href={shortname}>View Project</CardLink>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProjectCard;