import "./header.css";
import logo from "../../assets/marvel-logo.svg";
import stars from "../../assets/stars1.gif";
import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  return (
    <header className="header-container">
      <div>
        <img className="header-stars" src={stars} alt="" />
      </div>
      <div className="header-logo-area">
        <Link to={"/"}>
          <img src={logo} alt="marvel logo" />
        </Link>
      </div>
      <ul className="header-navigation">
        <li>
          <Link to="/characters">CHARACTERS</Link>
        </li>
        <li>
          <Link to="/comics">COMICS</Link>
        </li>
        <li>FAVORIS</li>
      </ul>

      {token ? (
        <Link to={"/"}>
          <ul>
            <li className="header-signup">
              <li className="header-login">
                <Link
                  onClick={() => {
                    handleToken(null);
                  }}
                  to="/"
                >
                  LOGOUT
                </Link>
              </li>
            </li>
          </ul>
        </Link>
      ) : (
        <ul className="header-signup">
          <li className="header-login">
            <Link to="/login">LOGIN</Link>
          </li>
          <li className="header-login">
            <Link to="/signup">SIGNUP</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
