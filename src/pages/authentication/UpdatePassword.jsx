import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../components/contexts/UserContext";

import Button from "../../components/Button";

import styles from "./UserRegistration.module.css";

function UpdatePassword() {
  const [formData, setFormData] = useState({ email: "" });
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      setErrorMsg("Fill all the fields");
      return formData;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("New passwords do not match");
      return formData;
    }

    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await updatePassword(formData);

      if (!error && data) {
        setFormData("");
        setMsg("Password updates");
        navigate("/app/customers");
      }
    } catch (error) {
      setErrorMsg("Error in update password. Please try again.");
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
          <h2>Reset password</h2>
          {msg && (
            <Alert variant="success" onClose={() => setMsg("")} dismissible>
              {msg}
            </Alert>
          )}
          <div className={`${styles.inputGroups} $`}>
            <div className={`${styles.inputControl} ${styles.passwordUpdate}`}>
              <label>New password: </label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={`${styles.inputControl} ${styles.passwordUpdate}`}>
              <label>Confirm password: </label>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
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
          <div className={styles.userFormBtn}>
            <Button type="memberBtn" disabled={loading}>
              Save password
            </Button>
          </div>

          <p className={styles}>
            <Link to="/app/users/login">Cancel</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default UpdatePassword;
