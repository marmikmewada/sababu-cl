import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import Button from "../../components/Button";
import styles from "./UserRegistration.module.css";

function Register() {
  const { signup } = useStore();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic frontend validation
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.email ||
        !formData.password ||
        !formData.confirm_password ||
        !formData.phone
      ) {
        setErrorMsg("Please fill all the fields");
        return;
      }

      if (formData.password !== formData.confirm_password) {
        setErrorMsg("Passwords don't match");
        return;
      }

      setLoading(true);
      setErrorMsg("");

      const userData = {
        firstName: formData.first_name,
        lastName: formData.last_name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      };

      // Log the data before sending the request
      console.log("Data to be sent:", userData);

      const data = await signup(userData);

      if (data && !data.error) {
        setMsg(
          "Registration successful. Please check your email to confirm your account."
        );
        navigate("/app/users/login");
      } else {
        setErrorMsg(data.error || "Registration failed");
      }
    } catch (error) {
      setErrorMsg("Error in creating account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userForm}>
      <section>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo-nobackground-200.png" alt="Sababu logo" />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {msg && (
            <Alert variant="success" onClose={() => setMsg("")} dismissible>
              {msg}
            </Alert>
          )}
          <h2>Signup</h2>
          <div className={styles.inputGroups}>
            <div className={`${styles.inputs} ${styles.twoEqualColumns}`}>
              <div className={styles.inputControl}>
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputControl}>
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.inputControl}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className={styles.inputControl}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className={styles.inputControl}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className={styles.inputControl}>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input
                type="password"
                name="confirm_password"
                required
                value={formData.confirm_password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirm_password: e.target.value
                  })
                }
              />
            </div>
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible
              >
                {errorMsg}
              </Alert>
            )}
          </div>
          <div className={styles.button}>
            <Button
              type="submit"
              text={loading ? "Loading..." : "Sign up"}
              disabled={loading}
            />
          </div>
          <p>
            Already have an account? <Link to="/app/users/login">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;
