import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import "./First.css";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <>
      <div className="wholepage">
        <header className="header">
          <nav
            className="navbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "20px 15px",
            }}
          >
            <h2 className="logo">
              <a href="#">FUNDTALK</a>
            </h2>
            <input type="checkbox" id="menu-toggle" />
            <label for="menu-toggle" id="hamburger-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </label>

            <div className="buttons">
              <Link to="login">
                <a href="#" className="signin">
                  Sign In
                </a>
              </Link>
              <Link to="signup">
                <a href="#" className="signup">
                  Sign Up
                </a>
              </Link>
            </div>
          </nav>
        </header>
        <section className="hero-section">
          <div className="hero">
            <h2>FINANCIAL ASSISTANCE</h2>
            <p>
              Join us in the exciting world of AI and turn your ideas into
              reality. Unlock the world of endless possibilities.Every question
              you have financially will be answered.
            </p>
            <div className="buttons">
              <a href="#" className="join">
                <Link to="signup"> Join Now</Link>
              </a>

              <a href="#" className="learn">
                <Link to="login">Log In</Link>
              </a>
            </div>
          </div>
          <div className="img">
            <img
              src="https://www.codingnepalweb.com/demos/create-responsive-website-html-css/hero-bg.png"
              alt="hero image"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default FirstPage;
