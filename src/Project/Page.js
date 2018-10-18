import React from 'react';
import {
    Col, Row
} from 'reactstrap';
import DefCarousel from '../Carousel/Carousel';


const headerStyle = {
    "margin": "50px 0px 50px 0px",
    "text-align": "center",
}

const projectPage = (props) => {
    let shortname = props.match.params.shortname

    let title = ""
    let subtext = ""
    let text = "Accumsan nostra diam faucibus dis nullam magnis odio ridiculus pulvinar vestibulum, orci per est sociosqu hendrerit ultricies justo nisi venenatis, consequat mi sem tristique fringilla morbi conubia non ligula. Libero lacinia vehicula leo felis praesent curae venenatis, diam cras sapien in mattis ante morbi, sodales pharetra pretium tempor justo hac. Venenatis euismod pretium fusce class lacus ut elit tristique nulla habitant hendrerit, inceptos hac potenti at taciti laoreet nibh scelerisque velit est sagittis natoque, platea phasellus parturient efficitur vel lectus urna lacinia tempus lorem. Eu ante metus enim varius et luctus feugiat neque, phasellus maximus himenaeos tellus senectus adipiscing habitasse, auctor posuere odio ut in ultricies imperdiet. Interdum et sem suspendisse maecenas netus magnis est, porta consectetur ante tellus non massa mattis, praesent felis himenaeos primis curae habitant."
    
    let images = [
        {
            src: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
            altText: 'Slide 1',
            caption: 'Slide 1'
        },
        {
            src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            altText: 'Slide 2',
            caption: 'Slide 2'
        },
        {
            src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            altText: 'Slide 3',
            caption: 'Slide 3'
        }
    ]

    switch (shortname) {
        case "homecooked":
            title = "Homecooked"
            break;
        default:
            title = "Not found"
            subtext = "Sorry, but we could not find the project you are looking for 😭"
            images = []
            text = ""
    }

    return (
        <div>
            {/* header  */}
            <div style={headerStyle}>
                <h2>{ title }</h2>
                <h4>{ subtext }</h4>
            </div>
            {/* carousel */}
            <div style={headerStyle}>
                <DefCarousel items={images} />
            </div>
            {/* text  */}
            <Row justify-content-center>
                <Col md={{ size: 8, offset: 2 }}>
                    <p>{ text }</p>
                </Col>
            </Row>
        </div>
    );
}

export default projectPage;