import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3500/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/sign-in");
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleCLick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //sigup button was showing in mobile view so useffect is used
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <> 
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-logo" to="/" onClick={closeMobileMenu}>
            TRVL <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleCLick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-items">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-items">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-items">
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle={"btn--outline"}>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;