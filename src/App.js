import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import DefNavbar from './Navbar/Navbar';
import Home from './Home/Home';
import Projects from './Projects/Projects';
import About from './About/About';
import Footer from './Footer/Footer';
import ProjectPage from './Project/Page';

import {
	Container,
	Row,
	Col,
	Jumbotron,
	Button
} from 'reactstrap';


import './App.css';

const mainContainerStyle = {
	"margin-bottom" : "100px",
	"margin-top" : "50px",
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<DefNavbar/>
				<Container style={mainContainerStyle}>
					<Route path="/" exact component={Home} />
					<Route path="/projects" exact component={Projects} />
					<Route path="/about" exact component={About} />
					<Route path="/projects/:shortname" exact component={ProjectPage} />
				</Container>
				<Footer/>
			</div>
		)
	}
}
	
export default App;
	

// import React, { Component } from 'react';
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
//     Container,
//     Row,
//     Col,
//     Jumbotron,
//     Button
// } from 'reactstrap';

// class App extends Component {
//     constructor(props) {
//         super(props);

//         this.toggle = this.toggle.bind(this);
//         this.state = {
//             isOpen: false
//         };
//     }
//     toggle() {
//         this.setState({
//             isOpen: !this.state.isOpen
//         });
//     }
//     render() {
//         return (
//             <div>
//                 <Navbar color="inverse" light expand="md">
//                     <NavbarBrand href="/">reactstrap</NavbarBrand>
//                     <NavbarToggler onClick={this.toggle} />
//                     <Collapse isOpen={this.state.isOpen} navbar>
//                         <Nav className="ml-auto" navbar>
//                             <NavItem>
//                                 <NavLink href="/components/">Components</NavLink>
//                             </NavItem>
//                             <NavItem>
//                                 <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
//                             </NavItem>
//                         </Nav>
//                     </Collapse>
//                 </Navbar>
//                 <Jumbotron>
//                     <Container>
//                         <Row>
//                             <Col>
//                                 <h1>Welcome to React</h1>
//                                 <p>
//                                     <Button
//                                         tag="a"
//                                         color="success"
//                                         size="large"
//                                         href="http://reactstrap.github.io"
//                                         target="_blank"
//                                     >
//                                         View Reactstrap Docs
//                                     </Button>
//                                 </p>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </Jumbotron>
//             </div>
//         );
//     }
// }

// export default App;