// Header.js
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          로고
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movie">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/todos">
              Todo List
            </Nav.Link>
            <NavDropdown title="Games" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/numberGuessingGame">
                Number Guessing Game
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/fastClick">
                Fask Click Game
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz">
                Quiz
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;