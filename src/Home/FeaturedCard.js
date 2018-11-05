import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

const BoxSize = {
    width : "670px",
};


const FeaturedCard = (props) => {

    let shortname = "##"
    let title = "Card title"
    let image = "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    let text = " text here "
    if (props.shortname) { shortname = "projects/" + props.shortname }
    if (props.title) { title = props.title }
    if (props.text) {text = props.text }
    if (props.image) { image = props.image }


    return (
        <div >
            <Card style = {BoxSize}>
                <img width="100%" src={ image } alt="Card cap"/>
                <CardBody>
                    <CardTitle>{ title }</CardTitle>
                    <CardText>{ text }</CardText>
                    <CardLink href={shortname}>View Project</CardLink>
                </CardBody>
            </Card>
        </div>
    );
};

export default FeaturedCard;
