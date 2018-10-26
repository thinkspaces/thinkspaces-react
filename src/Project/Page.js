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
            subtext = "Contact us: kevin@homecooked.io"
            text = "Homecooked is a social dining app that lets you book homecooked meals made by people in your neighborhood. Events are organized based on shared social interests and take place in the cook’s home, typically in groups of 6 or 8. Events range between $15-25/person, but ultimately the cook decides price based on cost of ingredients and time worked. Cooks make 85% and Homecooked makes a 15% cut."
            images = [
            {
                src: 'https://i.imgur.com/13WJMs2.jpg',
            },
            ]
            break;
        case "visionaryhealth":
            title = "Visionary Health"
            subtext = "Contact us: moustafa@visionairyhealth.com"
            text = "Launched through the support of Yale’s Tsai Center for innovative Thinking and MIT’s Sandbox Innovation Fund, Visionairy Health is an AI/Healthcare startup developing the first automated imaging screening platform — an artificially intelligent solution capable of reliably distinguishing between normal and abnormal medical images. Using our proprietary datasets of millions of images, we are training our solution to detect abnormalities in chest x-rays."
            images = [
            {
                src: 'https://i.imgur.com/pWyDjs3.png',
            },
            ]
            break;
        case "pearl":
            title = "Pearl"
            subtext = "Contact us: brandon.canfield@yale.edu"
            text = "Pearl is a biometric technology startup working on bringing the first global cloud-based biometric authentication platform to market! Our team believes that a robust biometric authentication platform capable of hosting massive numbers of individuals will solve problems pertaining to the verification of ownership, the empowerment of the unbanked, tax evasion, voter fraud (touchy, we know, but we want to try), and much more. As we grow, we see ourselves becoming a vehicle that promotes and furthers transparency, equity, and economic mobility."
            images = [
            {
                src: 'https://i.imgur.com/JwOFwwP.png',
            },
            ]
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