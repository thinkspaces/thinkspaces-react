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

    let contactus = "Contact us"
    let contact = ""

    let aboutus = "About us"
    let aboutdes = "Accumsan nostra diam faucibus dis nullam magnis odio ridiculus pulvinar vestibulum, orci per est sociosqu hendrerit ultricies justo nisi venenatis, consequat mi sem tristique fringilla morbi conubia non ligula. Libero lacinia vehicula leo felis praesent curae venenatis, diam cras sapien in mattis ante morbi, sodales pharetra pretium tempor justo hac. Venenatis euismod pretium fusce class lacus ut elit tristique nulla habitant hendrerit, inceptos hac potenti at taciti laoreet nibh scelerisque velit est sagittis natoque, platea phasellus parturient efficitur vel lectus urna lacinia tempus lorem. Eu ante metus enim varius et luctus feugiat neque, phasellus maximus himenaeos tellus senectus adipiscing habitasse, auctor posuere odio ut in ultricies imperdiet. Interdum et sem suspendisse maecenas netus magnis est, porta consectetur ante tellus non massa mattis, praesent felis himenaeos primis curae habitant."

    let whoweneed = ""
    let whodes = ""
    let whodes2 = ""

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
            contact = "kevin@homecooked.io"

            aboutdes = "Homecooked is a social dining app that lets you book homecooked meals made by people in your neighborhood. Events are organized based on shared social interests and take place in the cook’s home, typically in groups of 6 or 8. Events range between $15-25/person, but ultimately the cook decides price based on cost of ingredients and time worked. Cooks make 85% and Homecooked makes a 15% cut."

            whoweneed = "Who we need"
            whodes = "We’re looking for engineers who are passionate about connecting people, preferably with prior experience building an app. UI and design experience a huge plus."

            images = [
            {
                src: 'https://i.imgur.com/13WJMs2.jpg',
            },
            {
                src: 'https://i.imgur.com/kaHjrJE.jpg',
            },
            {
                src: 'https://i.imgur.com/AKFCQAg.jpg',
            },
            ]
            break;

        case "visionaryhealth":
            title = "Visionary Health"
            contact = "moustafa@visionairyhealth.com"

            aboutdes = "Launched through the support of Yale’s Tsai Center for innovative Thinking and MIT’s Sandbox Innovation Fund, Visionairy Health is an AI/Healthcare startup developing the first automated imaging screening platform — an artificially intelligent solution capable of reliably distinguishing between normal and abnormal medical images. Using our proprietary datasets of millions of images, we are training our solution to detect abnormalities in chest x-rays."

            whoweneed = "Who we need"
            whodes = "We are looking for people with an entrepreneurial mindset and interest in health care and/or machine learning to join our team on a part-time basis. Depending on the progress of the project, interns may be presented with the opportunity to take on a full-time leadership position in the company."
            whodes2 = "We are looking for people with an entrepreneurial mindset and interest in research, healthcare and/or Radiology to join our team on a part-tim basis. The position entails working mainly with patient data to perform different tasks such as identify different health conditions, anatomical structures, and localizing anomolies"

            images = [
            {
                src: 'https://i.imgur.com/pWyDjs3.png',
            },
            ]
            break;
        case "pearl":
            title = "Pearl"
            contact = "brandon.canfield@yale.edu"
            aboutdes = "Pearl is a biometric technology startup working on bringing the first global cloud-based biometric authentication platform to market! Our team believes that a robust biometric authentication platform capable of hosting massive numbers of individuals will solve problems pertaining to the verification of ownership, the empowerment of the unbanked, tax evasion, voter fraud (touchy, we know, but we want to try), and much more. As we grow, we see ourselves becoming a vehicle that promotes and furthers transparency, equity, and economic mobility."

            whoweneed = "Who we need"
            whodes = "So far our team has very extensive backend development experience, and Java/Android experience, but we're spread very thin. We're looking for someone with extensive Java and Android development experience to work on our frontend. iOS development, Python, and/or machine learning experience would be a pluss, but less immediately necessary. That would just allow us to be more flexible with changing work requirements"
            whodes2 = "We're also looking for someone with extensive web security experience, who has worked with AWS, Flask, Python, Apache and Nginx, and MySQL. Ideally the experience would be related to the payment industry"
            images = [
            {
                src: 'https://i.imgur.com/JwOFwwP.png',
            },
            ]
            break;
        case "moves":
            title = "MovesU"
            contact = "chris.moore@yale.edu "
            aboutdes = "MovesU is a fun, social events app for and driven by college students. With MovesU, hosts can make events and quickly invite as well as mix-and-match from large handcrafted groups of guests to create the perfect guest list fast. Once at the door, begone list of names and a flashlight! - each guest gets a digital ticket they can show at the door of the event to show they were invited. Later on, if the event started out private, the host has the option to open up their event to be seen by everybody nearby."
            whoweneed = "Who we need"
            whodes = "We are looking for events of any size, from small gatherings to massive parties. It's perfect for hosts who want to quickly invite small or large customizable groups of friends to their events, and the digital tickets for each event (if you need them) make checking in at the door a breeze for both guests and the bouncers. Try us out!"
            images = [
            {
                src: 'https://i.imgur.com/tsthgbV.jpg'
            },
            {
                src: 'https://i.imgur.com/zTxPgJE.png?1'
            },
            {
                src: 'https://i.imgur.com/VwT4LBS.png?1'
            },
            ]
            break;
        case "verb":
            title = "Verb Energy Co."
            contact = "https://www.verbenergy.co/"
            aboutdes = "You shouldn't have to settle for energy that doesn't make you feel good. We made Verb because we were tired of jitters, sugar crashes, and headaches. We deserved better and so do you."
            images = [
            {
                src: 'https://i.imgur.com/3ebztyQ.jpg'
            },
            {
                src: 'https://i.imgur.com/iLIKh2H.png?1'
            }
            ]
            break;
        case "snackpass":
            title = "Snackpass"
            contact = "https://www.snackpass.co/"
            aboutdes = "Get lit discounts and never wait in line again."
            images = [
            {
                src: 'https://i.imgur.com/kMhyEXX.png'
            },
            {
                src: 'https://i.imgur.com/9bXSTQS.jpg'
            },
            {
                src: 'https://i.imgur.com/bgPa6yV.jpg'
            }
            ]
            break;
        default:
            title = "Not found"
            contact = "Sorry, but we could not find the project you are looking for 😭"
            images = []
            aboutdes = ""
    }

    return (
        <div>
            {/* header  */}
            <Row >
                <Col>
                    <div style={headerStyle}>
                        <h1>{ title }</h1>
                    </div>
                    {/* carousel */}
                    <div style={headerStyle}>
                        <DefCarousel items={images} />
                    </div>
                </Col>
                <Col>
                    {/* text  */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Row justify-content-center>
                        <Col md = {3}>
                            <b>{ contactus }</b>
                        </Col>
                        <Col >
                            <b>{ contact }</b>
                        </Col>
                    </Row>


                    <br></br>

                    <Row justify-content-center>
                        <Col md = {3}>
                            <b>{ aboutus }</b>
                        </Col>
                        <Col>
                            <p>{ aboutdes }</p>
                        </Col>
                    </Row>

                    <br></br>

                    <Row justify-content-center>
                        <Col md={3}>
                            <b>{ whoweneed }</b>
                        </Col>
                        <Col >
                            <p>{ whodes }</p>
                            <p>{ whodes2 }</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default projectPage;
