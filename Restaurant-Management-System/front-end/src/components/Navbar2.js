import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { OwnerSidebarData } from "./sidebardata/OwnerSidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { ManagerSidebarData } from "./sidebardata/ManagerSidebarData";
import { ChefSidebarData } from "./sidebardata/ChefSidebarData";
import { WaiterSidebarData } from "./sidebardata/WaiterSidebarData";
import { SupplierSidebarData } from "./sidebardata/SupplierSidebarData";
import { CustomerSidebarData } from "./sidebardata/CustomerSidebarData";
import { adminLogout } from "../actions/adminActions";
import { customerLogout } from "../actions/customerActions";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Navbar2() {
  const [sidebar, setSidebar] = useState(false);
  const loggedin = sessionStorage["Loggedin"];
  const role = sessionStorage["role"];

  const dispatch = useDispatch();

  let customer;
  const customerSignin = useSelector((store) => store.customerSignin);
  const { response1 } = customerSignin;
  if (customerSignin.loading1 == false && customerSignin.response1) {
    customer = true;
  }

  const adminSignin = useSelector((store) => store.adminSignin);
  const { response } = adminSignin;
  let user;
  let show = false;
  if (adminSignin.loading == false && response) {
    user = adminSignin.response.role;
    show = true;
    customer = false;
  }

  if (role) {
    show = true;
  }

  const onLogout = () => {
    if (role == "CUSTOMER") {
      dispatch(customerLogout());
    } else {
      dispatch(adminLogout());
    }
  };

  useEffect(() => {}, [response]);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container>
        {/* sidebar  */}
        {(response || loggedin || response1) && (
          <DropdownButton
            onClick={showSidebar}
            className=" me-5"
            variant="warning"
            id="dropdown-basic-button"
            title="DelightfulPlates"
          >
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}

            <nav className={sidebar ? "nav-menu-active" : "nav-menu"}>
              <ul className="nav-menu-items">
                {/* <li className="navbar-toggle">
                  <Link
                    to="#"
                    className="menu-bars"
                    style={{ textDecoration: "none", fontSize: "20px" }}
                  >
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li> */}

                {show &&
                  (user == "OWNER" || role == "OWNER") &&
                  OwnerSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}

                {show &&
                  (user == "MANAGER" || role == "MANAGER") &&
                  ManagerSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                {show &&
                  (user == "CHEF" || role == "CHEF") &&
                  ChefSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                {show &&
                  (user == "WAITER" || role == "WAITER") &&
                  WaiterSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                {show &&
                  (user == "SUPPLIER" || role == "SUPPLIER") &&
                  SupplierSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                {(customer || role == "CUSTOMER") &&
                  CustomerSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </DropdownButton>
        )}

        <Navbar.Brand
          href="/home"
          style={{
            fontFamily: "monoBrush Scriptspace",
            color: "white",
            fontSize: "19px",
          }}
        >
          Home
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ color: "white", backgroundColor: "white" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/contactus"
              style={{
                fontFamily: "monoBrush Scriptspace",
                color: "white",
                fontSize: "19px",
              }}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              href="/about"
              style={{
                fontFamily: "monoBrush Scriptspace",
                color: "white",
                fontSize: "19px",
              }}
            >
              About Us
            </Nav.Link>

            {!adminSignin.response && !customerSignin.response1 && !role && (
              <NavDropdown
                title="Sign In"
                id="collasible-nav-dropdown"
                style={{ color: "white" }}
              >
                <NavDropdown.Item href="/adminsignin">
                  Admin Sign In
                </NavDropdown.Item>
                <NavDropdown.Item href="/customersignup">
                  Customer Signup
                </NavDropdown.Item>
                <NavDropdown.Item href="/customersignin">
                  Customer Sign In
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {(adminSignin.response || customerSignin.response1 || role) && (
            <Nav>
              <a href="/home">
                <Button onClick={onLogout} variant="warning">
                  Log Out
                </Button>{" "}
              </a>{" "}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
