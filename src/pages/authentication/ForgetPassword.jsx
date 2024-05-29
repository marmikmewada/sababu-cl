import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { useAuth } from "../../components/contexts/UserContext";
import Button from "../../components/Button";

import styles from "./UserRegistration.module.css";

function ForgetPassword() {
  const { passwordReset } = useAuth();
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setErrorMsg("Fill in the email");
      return formData;
    }

    try {
      setLoading(true);
      await passwordReset(formData.email);
      setMsg("Password reset has been sent to your email.");
      navigate("/app/users/login");
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <div className={`${styles.userForm}`}>
      <section>
        <div className={styles.logo}>
          <img src="/logo-nobackground-200.png" alt="Sababu logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Request an account or password reset.</h3>
          <div className={styles.inputGroups}>
            <div>
              <input
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email address"
              />
            </div>
            {msg && (
              <Alert variant="success" onClose={() => setMsg("")} dismissible>
                {msg}
              </Alert>
            )}
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible
              >
                {msg}
              </Alert>
            )}
          </div>
          <div className={styles.userFormBtn}>
            <Button type="memberBtn" disabled={loading}>
              Reset
            </Button>
          </div>

          <p>
            <Link to="/app/users/login">Cancel</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default ForgetPassword;
