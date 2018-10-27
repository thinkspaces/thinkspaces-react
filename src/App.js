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