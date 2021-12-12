import React, { useContext } from "react";
import { ConfigContext } from "../config";

type propsType = {
  text: string;
};

const Loader = (props: propsType) => {
  const { config } = useContext(ConfigContext);
  const { Colors } = config;
  const styles = getStyles(Colors);
  return (
    <>
      <div style={styles.container}>
        <div style={styles.loaderContainer}>{props.text}</div>
      </div>
    </>
  );
};

const getStyles = (Colors: any) => {
  return {
    container: {
      display: "flex",
      position: "absolute" as "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: "#00000050",
      zIndex: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    loaderContainer: {
      //   flex: 1,
      //   height: 50,
      //   width: 50,
      padding: 50,
      backgroundColor: Colors.white_1,
      color: Colors.black,
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
    },
  };
};

export default Loader;
