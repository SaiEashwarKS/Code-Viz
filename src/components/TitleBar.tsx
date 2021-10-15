import { Colors } from "../colors";
import { Link } from "react-router-dom";
import pesLogo from "../images/pes.jpg";

const TitleBar = () => {
  return (
    <>
      <Link to="/" style={styles.link}>
        <div style={styles.container}>
          <div style={styles.titleText}>
            <strong>Code-Viz</strong>
          </div>
          <div style={styles.logoContainer}>
            <img src={pesLogo} alt="PES University" style={styles.pesLogo} />
          </div>
        </div>
      </Link>
    </>
  );
};

const styles = {
  link: { textDecoration: "none", color: "black" },
  container: {
    margin: 16,
    display: "flex",
    flex: 1,
    backgroundColor: Colors.green_1,
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
