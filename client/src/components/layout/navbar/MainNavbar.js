import React, { useState } from "react";
import { Button, Offcanvas, Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useSessionContext } from "../../../context/unsecured/sessionContext";
import "./index.scss";
export default function MainNavbar() {
  const {user} = useSessionContext()
  
  return (

    <Navbar bg="light" expand="lg">
  <Container fluid="lg">
    <Navbar.Brand className="text-decoration-none text-primary" to="/">Jimmodel</Navbar.Brand>
  
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
    <Nav
        className="ms-auto  my-2 my-lg-0 d-none d-lg-flex"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Link className="text-decoration-none text-dark my-2 fs-6 mx-2" to="/">Calender</Link>
        <Link className="text-decoration-none text-dark my-2 fs-6 mx-2" to="/job">Job</Link>
        <Link className="text-decoration-none text-dark my-2 fs-6 mx-2" to="/model">Model</Link>
      {(user.role === 'admin' || user.role === 'root') &&  <Link className="text-decoration-none text-dark my-2 fs-6 mx-2" to="/admin">Admin</Link>}
      
      </Nav>
    <Navbar.Offcanvas
      className="d-lg-none"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="start"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="ms-4 text-primary" id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <Nav
        className="ms-4"
       
       
      >
        <Link className="text-decoration-none text-dark my-2 fs-6" to="/">Calender</Link>
        <Link className="text-decoration-none text-dark my-2 fs-6" to="/job">Job</Link>
        <Link className="text-decoration-none text-dark my-2 fs-6" to="/model">Model</Link>
        <Link className="text-decoration-none text-dark my-2 fs-6" to="/admin">Admin</Link>
      
      </Nav>
       
      </Offcanvas.Body>
    </Navbar.Offcanvas>
      
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}
