import React from 'react';
import {
    Col, Row
} from 'reactstrap';

const headerStyle = {
    "margin": "50px 0px 50px 0px",
    "text-align": "center",
}

const about = (props) => {
    return (
        <div>
            <div style={headerStyle}>
                <h2> About Thinkspaces </h2>
            </div>
            <Row justify-content-center>
        
                <Col md={{size : 9, offset : 4 }}>
                    <img width="40%" src="https://i.imgur.com/E1LnmWB.png"/>
                </Col>
                <br></br>
             </Row>

             <br></br>
            <Row justify-content-center>   
                <Col md={{ size: 8, offset: 2 }}>
                    <p> Make collaboration easier with Thinkspaces.</p>
                    <p> There are a lot of talented Yalies with great ideas, but unfortunately not all the resources are there. In particular, bringing together a functional team can be difficult.</p>
                    <p> As a result, we want to make it as easy for you to find the people you need so that you can get to working on your idea as fast as possible. Simply post whatever you are working on - creative passion project, startup, club project, anything - and utlize our network of creatives to help bring your idea to life.</p>
                    
                    </Col>
            </Row>
        </div>
    );
}

export default about;