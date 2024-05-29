import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import Button from "../../components/Button";
import styles from "./UserLogin.module.css";

function Login() {
  const { signin } = useStore();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");

      // Call signin function and log the returned data
      const data = await signin(formData.emailOrPhone, formData.password);
      console.log('Data received after signin:', data);

      // Example logic based on returned data
      if (data && !data.error) {
        navigate("/app/profile");
      } else {
        setErrorMsg(data.error || "Login failed");
      }
    } catch (error) {
      setErrorMsg("Error in login: " + error.message);
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
          <h2>Login</h2>
          <div className={styles.inputControl}>
            <label htmlFor="emailOrPhone">Email or Phone:</label>
            <input
              type="text"
              name="emailOrPhone"
              required
              value={formData.emailOrPhone}
              onChange={(e) =>
                setFormData({ ...formData, emailOrPhone: e.target.value })
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
          {errorMsg && (
            <Alert
              variant="danger"
              onClose={() => setErrorMsg("")}
              dismissible
            >
              {errorMsg}
            </Alert>
          )}
          <div className={styles.button}>
            <Button
              type="submit"
              text={loading ? "Loading..." : "Login"}
              disabled={loading}
            />
          </div>
          <p>
            Don't have an account? <Link to="/app/users/register">Sign up</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Login;



