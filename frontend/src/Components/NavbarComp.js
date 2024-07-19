import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavbarComp() {
  const [openNavColor, setOpenNavColor] = useState(false);
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  function clear() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <MDBNavbar expand="lg" dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand
            href="/"
            style={{ fontWeight: "bolder", fontSize: "2em" }}
          >
            BirthDay Portal
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNavColor(!openNavColor)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColor} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              {auth && (
                <>
                  <MDBNavbarItem className="active">
                    <Link
                      to="/"
                      style={{ color: "white" }}
                      className="nav-link"
                    >
                      Home
                    </Link>
                  </MDBNavbarItem>
                  <MDBNavbarItem className="active">
                    <Link
                      to="/adduser"
                      style={{ color: "white" }}
                      className="nav-link"
                    >
                      Add Birthday
                    </Link>
                  </MDBNavbarItem>
                </>
              )}

              {!auth && (
                <MDBNavbarItem>
                  <Link
                    to="/login"
                    style={{ color: "white" }}
                    className="nav-link"
                  >
                    LogIn
                  </Link>
                </MDBNavbarItem>
              )}
              {!auth && (
                <MDBNavbarItem>
                  <Link
                    to="/signup"
                    style={{ color: "white" }}
                    className="nav-link"
                  >
                    SignUp
                  </Link>
                </MDBNavbarItem>
              )}
              {auth && (
                <MDBNavbarItem>
                  <div
                    style={{
                      color: "white",
                      cursor: "pointer",
                    }}
                    className="nav-link"
                    onClick={clear}
                  >
                    LogOut
                  </div>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
