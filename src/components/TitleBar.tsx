import React from "react";
import pesLogo from "../images/pes.jpg";

const TitleBar = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.titleText}>Code-Viz</div>
        <div style={styles.logoContainer}>
          <img src={pesLogo} alt="PES University" style={styles.pesLogo} />
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    margin: 16,
    display: "flex",
    flex: 1,
    backgroundColor: "#4de85a",
    flexDirection: "row" as "row", //workaround for TS error
    boxShadow: "0 5px 10px rgb(0 0 0 / 0.4)",
  },
  titleText: {
    fontSize: 20,
    padding: 16,
  },
  logoContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  pesLogo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
};

export default TitleBar;
