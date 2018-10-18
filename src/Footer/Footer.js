import React from 'react';
import {
    Row,
    Col,
    Container,
} from 'reactstrap';

const footerStyle = {
    "position" : "absolute",
    // "margin" : "50px 0px 0px 0px",
    "bottom": "0px",
    "width" : "100%",
    "height": "60px", // fixed height of footer
    "line-height" : "60px", // vertically center text
    "background-color": "#f5f5f5" 
}

const footer = (props) => {
    return (
        <div>
            <footer className="footer" style={footerStyle}>
                <Container>
                    <span class="text-muted">© Thinkspaces 2018. All rights reserved.</span>
                </Container>
            </footer>
        </div>
    );
}

export default footer;