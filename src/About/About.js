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
                <h2>About Thinkspaces</h2>
            </div>
            <Row justify-content-center>
                <Col md={{ size: 8, offset: 2 }}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc lobortis. Pellentesque id nibh tortor id aliquet lectus proin nibh. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Tincidunt lobortis feugiat vivamus at augue. Eget egestas purus viverra accumsan in. Semper risus in hendrerit gravida rutrum quisque. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Massa massa ultricies mi quis hendrerit dolor magna. Cras sed felis eget velit aliquet sagittis. Condimentum id venenatis a condimentum vitae sapien pellentesque. Ac tortor dignissim convallis aenean et tortor at risus. Malesuada pellentesque elit eget gravida cum sociis. Metus dictum at tempor commodo ullamcorper a lacus.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc lobortis. Pellentesque id nibh tortor id aliquet lectus proin nibh. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Tincidunt lobortis feugiat vivamus at augue. Eget egestas purus viverra accumsan in. Semper risus in hendrerit gravida rutrum quisque. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Massa massa ultricies mi quis hendrerit dolor magna. Cras sed felis eget velit aliquet sagittis. Condimentum id venenatis a condimentum vitae sapien pellentesque. Ac tortor dignissim convallis aenean et tortor at risus. Malesuada pellentesque elit eget gravida cum sociis. Metus dictum at tempor commodo ullamcorper a lacus.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc lobortis. Pellentesque id nibh tortor id aliquet lectus proin nibh. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Tincidunt lobortis feugiat vivamus at augue. Eget egestas purus viverra accumsan in. Semper risus in hendrerit gravida rutrum quisque. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Massa massa ultricies mi quis hendrerit dolor magna. Cras sed felis eget velit aliquet sagittis. Condimentum id venenatis a condimentum vitae sapien pellentesque. Ac tortor dignissim convallis aenean et tortor at risus. Malesuada pellentesque elit eget gravida cum sociis. Metus dictum at tempor commodo ullamcorper a lacus.</p>
                </Col>
            </Row>
        </div>
    );
}

export default about;