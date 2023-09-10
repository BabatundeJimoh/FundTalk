import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            md="5"
            style={{
              backgroundColor: "black",
              color: "white",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "100vh",
              alignContent: "center",
            }}
          >
            <div>
              <h3>
                <b style={{ marginLeft: "40px" }}>New here?</b>
              </h3>
              <p>Create your new account here</p>
              <Link to="/signup">
                <Button variant="warning" style={{ marginLeft: "60px" }}>
                  <b>SignUp</b>
                </Button>
              </Link>
            </div>
          </Col>

          <Col
            md="7"
            style={{
              color: "white",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "100vh",
              alignContent: "center",
            }}
          >
            <div>
              <Form
                style={{
                  backgroundColor: "#f5f5f5",
                  width: "500px",
                  height: "400px",
                  borderRadius: "8px",
                }}
              >
                <h2
                  style={{
                    color: "black",
                    textAlign: "center",
                    paddingTop: "50px",
                  }}
                >
                  <b>Sign In</b>
                </h2>
                <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    style={{ width: "300px", marginLeft: "90px" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{
                      width: "300px",
                      alignItems: "center",
                      marginLeft: "90px",
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  style={{
                    width: "250px",
                    marginTop: "30px",
                    marginLeft: "120px",
                    alignItems: "center",
                    height: "60px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
