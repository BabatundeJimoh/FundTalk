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
import { useCookies } from "react-cookie";

function Dashboard() {
  
  const [appear, setAppear] = useState(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mess, setMess] = useState(null);

  useEffect(() => {
    const verifyCookie = async () => {
      console.log("Current cookies.token:", cookies.token);

      if (!cookies.token) {
        console.log("Token not found. Redirecting to login.");
        navigate("/");
      } else {
        try {
          const { data } = await axios.post(
            "https://fundtalk.onrender.com",
            {},
            { withCredentials: true }
          );
          console.log("Server response:", data);

          const { status, user } = data;
          setUsername(user);
          return status
            ? toast(`Hello ${user}`, { position: "top-right" })
            : (removeCookie("token"), navigate("/"));
        } catch (error) {
          console.error("Error verifying cookies:", error);
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = async () => {
    try {
      // await axios.post("/logout");
      removeCookie("token");
      toast.success("logout successfully ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = () => {
    setMess(null);
    setMessage("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMess(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      message: message,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/openai/chatbot",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

        const data = await response.data;
        // console.log(data);
        setUserInput("")
        setChats((chats) => [
          ...chats,
          {
            title: currentTitle,
            role: "user",
            content: userInput,
          },
          {
            title: currentTitle,
            role: data.choices[0].message.role,
            content: data.choices[0].message.content,
          },
        ]);
        // setMessage(data.choices[0].message);
        
        setIsTyping(false)
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    // console.log(currentTitle, message, mess);
    if (!currentTitle && message && mess) {
      setCurrentTitle(message);
    }
    if (currentTitle && message && mess) {
      setChats((chats) => [
        ...chats,
        {
          title: currentTitle,
          role: "user",
          content: message,
        },
        {
          title: currentTitle,
          role: mess.role,
          content: mess.content,
        },
      ]);
    }
  }, [mess, currentTitle]);

  const currentChat = chats.filter((chat) => chat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(chats.map((chat) => chat.title)));

  return (
    <div>
      <Container
        fluid
        style={{
          fontFamily: "monospace",
          fontSize: "15px",

          /* Remove default padding for responsiveness */
        }}
      >
        <Row>
          {[""].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand href="#"> </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  style={{ backgroundColor: "black" }}
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header
                    closeButton
                    style={{ backgroundColor: "white" }}
                  >
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <Button
                        variant="dark"
                        style={{
                          /* Full width for small screens */
                          height: "60px",
                          backgroundColor: "#40403f",
                        }}
                      >
                        <i
                          className="bi bi-plus-square"
                          style={{ marginRight: "10px" }}
                        ></i>
                        New Chat
                      </Button>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body style={{ backgroundColor: "#40403f" }}>
                    {/* Add your Offcanvas content here */}
                  </Offcanvas.Body>
                  <Dropdown drop="up">
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      variant="dark"
                      style={{
                        width: "100%",
                        height: "70px",
                        backgroundColor: "#40403f",
                        color: "#fff",
                        borderRadius: "4px",
                        boxShadow:
                          "0px 4px 6px rgba(0, 0, 0, 0.1)" /* Drop shadow */,
                        border: "none" /* Remove border */,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      See more
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{
                        width: "70vh",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                      }}
                    >
                      <Dropdown.Item
                        href="#/action-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i
                          className="bi bi-chat-left-dots"
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        ></i>
                        Custom Instructions
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i
                          className="bi bi-gear"
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        ></i>
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-3"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i
                          className="bi bi-person-circle"
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        ></i>
                        {username}
                      </Dropdown.Item>

                      <hr style={{ backgroundColor: "black" }}></hr>
                      <Dropdown.Item
                        onClick={Logout}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i
                          className="bi bi-box-arrow-right"
                          style={{ fontSize: "20px", marginRight: "10px" }}
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
        <>
          {appear ? (
            <div>
              <Row
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img
                  alt="Fundtalk Logo"
                  src={logo}
                  style={{ height: "140px", width: "210px", maxWidth: "100%" }}
                />
              </Row>
              <Row
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "80px",
                }}
              >
                <Card
                  className="col-lg-4 col-md-6" /* Responsive card size */
                  style={{
                    backgroundColor: "lavender",
                    width: "20rem",
                    margin: "8px",
                  }}
                >
                  <Card.Body>
                    <Card.Text style={{ fontSize: "15px" }}>
                      <b>Calender</b>
                      <p>Good financial plan</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card
                  className="col-lg-4 col-md-6" /* Responsive card size */
                  style={{
                    backgroundColor: "lavender",
                    width: "20rem",
                    margin: "8px",
                  }}
                >
                  <Card.Body>
                    <Card.Text>
                      <b>Financial advice</b>
                      <p>It produces Financial advices </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <Row style={{ justifyContent: "center", display: "flex" }}>
                <Card
                  className="col-lg-4 col-md-6" /* Responsive card size */
                  style={{
                    backgroundColor: "lavender",
                    width: "20rem",
                    margin: "8px",
                  }}
                >
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text>Train to decline wrong request</Card.Text>
                  </Card.Body>
                </Card>{" "}
                <Card
                  className="col-lg-4 col-md-6" /* Responsive card size */
                  style={{
                    backgroundColor: "lavender",
                    width: "20rem",
                    margin: "8px",
                  }}
                >
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text>Limited knowledge </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </div>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "40px",
                  marginLeft: "200px",
                  marginRight: "200px",
                  borderRadius: "20px",
                }}
              >
                <section>
                  {chats.map((chat, index) => (
                    <p
                      key={index}
                      className={chat && chat.role === "user" ? "user_msg" : ""}
                    >
                      <span>
                        <b>{chat.role && chat.role.toUpperCase()}</b>
                      </span>
                      <span>:</span>
                      <span>{chat.content}</span>
                    </p>
                  ))}
                  {chats.length === 0 && (
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "22px",
                      }}
                    ></div>
                  )}
                </section>
                <div className={isTyping ? "" : "hide"}>
                  <p>
                    <i>{isTyping ? "Typing" : ""}</i>
                  </p>
                </div>
              </div>
            </>
          )}
        </>

        <Row
          className="fixed-bottom bg-white"
          style={{
            backgroundColor: "white",

            // Adjust the value on large and larger screens
          }}
        >
          <div
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",

              width: "100%",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Form
                style={{ width: "700px" }}
                action=""
                onSubmit={(event) => handleSubmit(event, message)}
              >
                <InputGroup className="mb-3">
                  <Form.Control
                    style={{ height: "55px" }}
                    type="text"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    placeholder="Write a message"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />

                  <InputGroup.Text id="basic-addon2">
                    <Button type="submit" onClick={() => setAppear(false)}>
                      <i className="bi bi-send"></i>
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "11px", textAlign: "center" }}>
              Free Research Preview. FundTalk may produce inaccurate information
              about people, places, or facts. FundTalk August 3 Version
            </p>
          </div>

          <Row style={{ bottom: "0" }}>
            <Col>
              <i
                className="bi bi-question-circle"
                style={{ fontSize: "23px" }}
              ></i>
            </Col>
          </Row>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
