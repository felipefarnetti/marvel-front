import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./fader.css";

const Fader = ({ text }) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      if (fadeProp.fade === "fade-in") {
        setFadeProp({
          fade: "fade-out",
        });
      } else {
        setFadeProp({
          fade: "fade-in",
        });
      }
    }, 8000);

    return () => clearInterval(timeout);
  }, [fadeProp]);

  return (
    <>
      <h1 data-testid="fader" className={fadeProp.fade}>
        {text}
      </h1>
    </>
  );
};

Fader.propTypes = {
  text: PropTypes.string,
};

export default Fader;
