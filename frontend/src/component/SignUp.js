import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    const { name, email, password } = formData
    if (Object.keys(validationErrors).length === 0) {
      try {
         const { formData } = await axios.post('/register', { name, email, password })
        setFormData({})
        navigate('/')
      } catch (error) {
        console.log('Registration error:', error);
      }
      console.log("Form is valid:", formData);
    } else {
      // Form has errors, set the errors state
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Form
        style={{
          width: "550px",
          marginTop: "50px",
          backgroundColor: "#f5f2f0",
          marginBottom: "50px",
          borderRadius: "30px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            marginLeft: "80px",
            marginRight: "80px",
            paddingTop: "50px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h5>Create an account</h5>
            <div style={{ color: "blue" }}>
              <p style={{ fontSize: "14px" }}>
                Already have an account?<b>Sign In </b>
              </p>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="E-mail address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
            <p
              style={{
                fontSize: "11px",
                textAlign: "center",
                paddingTop: "5px",
              }}
            >
              By logging in you agree to our{" "}
              <b style={{ color: "blue" }}>Terms of Use</b> and{" "}
              <b style={{ color: "blue" }}>Privacy Policy</b>
            </p>
          </Form.Group>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button variant="success" type="submit" style={{ width: "100vh" }}>
              Sign Up
            </Button>
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                border: "0px",
                marginTop: "10px",
                width: "100px",
                height: "1px",
                backgroundColor: "black",
                marginRight: "10px",
              }}
            ></div>
            <div style={{ fontSize: "12px" }}>
              <b>or sign up with</b>
            </div>
            <div
              style={{
                border: "0px",
                marginTop: "10px",
                width: "100px",
                height: "1px",
                backgroundColor: "black",
                marginLeft: "10px",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                width: "180px",
                color: "black",
                backgroundColor: "white",
              }}
            >
              <span>
                <img
                  src="data:image/png;base64,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"
                  style={{
                    width: "20px",
                    marginRight: "20px",
                    marginBottom: "4px",
                  }}
                />
                Github
              </span>
            </Button>
            <Button
              style={{
                width: "180px",
                color: "black",
                backgroundColor: "white",
                borderStyle: "solid",
              }}
            >
              {/* <ion-icon
                name="logo-google"
                style={{
                  marginRight: "12px",
                  fontSize: "20px",
                }}
              ></ion-icon> */}

              <span>
                <img
                  src="data:image/png;base64,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"
                  style={{
                    width: "20px",
                    marginRight: "20px",
                    marginBottom: "4px",
                  }}
                ></img>
                Google
              </span>
            </Button>
          </div>
          ;
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
