import axios from "axios";
import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

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
    });
  };
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const { data } = await axios.post(
          "/users/login",
          { ...formData },
          { withCredentials: true }
        );
        // console.log("API Response:", data)
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log("Login error:", error);
      }
      setFormData({
        ...formData,
        email: "",
        password: "",
      });
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
        <Row className="align-items-center min-vh-100">
          <Col
            xs={12}
            md={5}
            style={{
              backgroundColor: "black",
              color: "white",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <h3>
                <b>New here?</b>
              </h3>
              <p>Create your new account here</p>
              <Link to="/signup">
                <Button variant="warning">
                  <b>SignUp</b>
                </Button>
              </Link>
            </div>
          </Col>

          <Col
            xs={12}
            md={7}
            style={{
              color: "white",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form
              style={{
                backgroundColor: "#f5f5f5",
                maxWidth: "500px",
                width: "90%",
                padding: "20px",
                borderRadius: "8px",
              }}
              onSubmit={handleSubmit}
            >
              <h2 style={{ color: "black", textAlign: "center" }}>
                <b>Sign In</b>
              </h2>
              <br />
              <Form.Group
                controlId="formBasicEmail"
                style={{ padding: "20px" }}
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                style={{ padding: "20px" }}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password}
                  </Form.Text>
                )}
              </Form.Group>

              <Button
                type="submit"
                style={{
                  width: "92%",
                  marginTop: "40px",
                  backgroundColor: "black",
                  color: "white",
                  padding: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  marginTop: "20px",
                }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}

export default Home;
