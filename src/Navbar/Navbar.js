import React, { Component } from 'react';
import logo from "../logo.png";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

export default class DefNavbar extends Component {
    // constructor
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    // toggle method
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // render method
    render() {
        return (
            <Navbar color="inverse" light expand="md">
                <Container>
                    <NavbarBrand>
                        <img 
                            width="30px" 
                            className="d-inline-block align-top rounded" 
                            src={logo}
                            alt="Logo">
                        </img> 
                    </NavbarBrand>
                    <NavbarBrand href="/">
                        Thinkspaces
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/projects">Projects</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/about">About</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
} 


