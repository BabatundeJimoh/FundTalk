import axios from "axios";
import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleError = (err) => {
    console.log(err);
    toast.error(err, {
      position: "bottom-left",
    })
  }
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const { data } = await axios.post('/login', 
          { ...formData }, {withCredentials: true} 
        )
        // console.log("API Response:", data)
        const {success, message } = data
        if (success) {
          handleSuccess(message)
          setTimeout(() => {
            navigate('/dashboard')
          }, 1000)
        } else {
          handleError(message)
        }
        
      } catch (error) {
        console.log('Login error:', error);
      }
      setFormData({
        ...formData,
        email: '',
        password: ''
      })
      // console.log("Form data:", formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                  height: "530px",
                  borderRadius: "8px",
                }}
                onSubmit={handleSubmit}
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
                    name="email"
                    placeholder="Enter email"
                    style={{ width: "300px", marginLeft: "90px" }}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <Form.Text
                      className="text-danger"
                      style={{ marginLeft: "100px" }}
                    >
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    style={{
                      width: "300px",
                      alignItems: "center",

                      marginLeft: "90px",
                    }}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <Form.Text
                      className="text-danger"
                      style={{ marginLeft: "100px" }}
                    >
                      {errors.password}
                    </Form.Text>
                  )}
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
            <ToastContainer />
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default Home;
