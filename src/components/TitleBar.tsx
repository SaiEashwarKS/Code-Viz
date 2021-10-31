import { Link } from "react-router-dom";
import pesLogo from "../images/pes.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { SettingsMenu } from ".";
import { useContext, useState } from "react";
import { ThemeContext } from "../theme";

const TitleBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const onSettingsClick = () => {
    setShowSettings(!showSettings);
  };
  const { Colors } = useContext(ThemeContext);
  const styles = getStyles(Colors);
  const settingsIconBgColor = showSettings
    ? Colors.primary_2
    : Colors.primary_1;
  return (
    <>
      <div style={styles.container}>
        <Link to="/" style={styles.link}>
          <div style={styles.titleText}>
            <strong>Code-Viz</strong>
          </div>
        </Link>
        <div style={styles.logoContainer}>
          <div
            style={{
              ...styles.settingsIconContainer,
              ...{ backgroundColor: settingsIconBgColor },
            }}
            onClick={onSettingsClick}
          >
            <FontAwesomeIcon icon={faSlidersH} style={styles.settingsIcon} />
          </div>
          <img src={pesLogo} alt="PES University" style={styles.pesLogo} />
        </div>
      </div>
      {showSettings ? (
        <div style={styles.settingsMenuContainer}>
          <SettingsMenu />
        </div>
      ) : null}
    </>
  );
};

const getStyles = (Colors: any) => {
  return {
    link: { textDecoration: "none", color: "black" },
    container: {
      margin: 16,
      display: "flex",
      flex: 1,
      backgroundColor: Colors.primary_1,
      flexDirection: "row" as "row", //workaround for TS error
      boxShadow: "0 5px 10px rgb(0 0 0 / 0.4)",
      userSelect: "none" as "none",
    },
    titleText: {
      fontSize: 20,
      padding: 16,
      color: Colors.white_1,
    },
    logoContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    settingsIconContainer: {
      cursor: "pointer",
      margin: 4,
      borderRadius: 50,
      height: 50,
      width: 50,
    },
    settingsIcon: {
      color: Colors.constantBlack,
      margin: 10,
      fontSize: 30,
    },
    pesLogo: {
      height: 50,
      width: 50,
      marginRight: 10,
    },
    settingsMenuContainer: {},
  };
};

export default TitleBar;
