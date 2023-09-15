import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import logo from "../images/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cookies, removeCookie] = useState([])
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       navigate('/')
  //     }
  //     const { data } = await axios.post('/', {}, { withCredentials: true })
  //     const { status, user } = data
  //     setUsername(user)
  //     // if (status) {
  //     //   toast(`Hello ${user}`, {position: "top-right"})
  //     //   navigate('/dashboard')
  //     // } else {
  //     //   removeCookie("token");
  //     //   navigate('/');
  //     // }
  //     return status ? toast(`Hello ${user}`, {position: "top-right"}) : (removeCookie("token"), navigate('/'))
  //   }
  //   verifyCookie()
  // }, [cookies, navigate, removeCookie])

  const Logout = async () => {
    try {
      await axios.post("/logout");
      removeCookie("token");
      toast.success("logout successfully ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event, message) => {
    event.preventDefault()

    if(!message) return;
    setIsTyping(true)
    // scrollTo(0, 1e10)

    let msgs = chats
    msgs.push({ role: "user", content: message})
    setChats(msgs)

    setMessage("")

    try {
      const response = await axios.post("/dashboard", { chats })
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      msgs.push(data.output)
      setChats(msgs)
      setIsTyping(false)
      // scrollTo(0, 1e10)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
      <Container
        fluid
        style={{ height: "100vh", fontFamily: "monospace", fontSize: "15px" }}
      >
        <Row>
          {["xxl"].map((expand) => (
            <Navbar key={expand} expand={expand} className=" mb-3">
              <Container fluid>
                <Navbar.Brand href="#"> </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  style={{ backgroundColor: "lavender" }}
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                      style={{ backgroundColor: "lavender" }}
                    >
                      <Button
                        variant="dark"
                        style={{ width: "320px", height: "60px" }}
                      >
                        <i
                          className="bi bi-plus-square"
                          style={{ marginRight: "10px" }}
                        ></i>
                        New Chat
                      </Button>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body style={{ backgroundColor: "lavender" }}>
                    {/* Add your Offcanvas content here */}
                  </Offcanvas.Body>
                  <hr></hr>

                  <Dropdown drop="up">
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      variant="dark"
                      style={{ width: "400px", height: "60px" }}
                    >
                      See more
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{
                        width: "70vh",
                        color: "white",
                      }}
                    >
                      <Dropdown.Item href="#/action-1">
                        <i
                          class="bi bi-chat-left-dots"
                          style={{ fontSize: "20px", marginRight: "30px" }}
                        ></i>
                        Custom Instructions
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        <i
                          class="bi bi-gear"
                          style={{ fontSize: "20px", marginRight: "30px" }}
                        ></i>
                        Settings
                      </Dropdown.Item>
                      <hr style={{ color: "black" }}></hr>
                      <Dropdown.Item onClick={Logout}>
                        {" "}
                        <i
                          class="bi bi-box-arrow-right"
                          style={{ fontSize: "20px", marginRight: "30px" }}
                        ></i>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </Row>
        <Row
          style={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img src={logo} style={{ height: "140px", width: "210px" }} />
        </Row>

        <Row
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "80px",
            paddingBottom: "15px",
          }}
        >
          <Card
            style={{
              width: "20rem",
              marginRight: "5px",
              backgroundColor: "lavender",
            }}
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text style={{ fontSize: "15px" }}>
                <b>Calender</b>
                <p>Good financial plan</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "20rem",
              backgroundColor: "lavender",
              marginLeft: "5px",
            }}
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
                <b>Financial advice</b>
                <p>It produces Financial advices </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row style={{ justifyContent: "center", display: "flex" }}>
          <Card
            style={{
              width: "20rem",
              marginRight: "5px",
              backgroundColor: "lavender",
            }}
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>Train to decline wrong request</Card.Text>
            </Card.Body>
          </Card>{" "}
          <Card
            style={{
              width: "20rem",
              backgroundColor: "lavender",
              marginLeft: "5px",
            }}
          >
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>Limited knowledge </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <div
            style={{
              paddingLeft: "300px",
              paddingRight: "300px",
              marginTop: "30px",
            }}
          >
            <Form action="" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                style={{ height: "55px" }}
                type="text"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a messgae"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">
                <i class="bi bi-send"></i>
              </InputGroup.Text>
            </InputGroup>
            </Form>
          </div>
          <div>
            <p style={{ fontSize: "11px", textAlign: "center" }}>
              Free Research Preview. FundTalk may produce inaccurate information
              about people, places, or facts. FundTalk August 3 Version
            </p>
          </div>
        </Row>
        <i class="bi bi-question-circle" style={{ fontSize: "19px" }}></i>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
