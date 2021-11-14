import React, { useContext } from "react";
import { ConfigContext } from "../config";

type propsType = {
  outputs: string[];
};

const Stdout = (props: propsType) => {
  const { outputs } = props;
  const { config } = useContext(ConfigContext);
  const { Colors, fontSize } = config;
  const styles = getStyles(Colors, fontSize);
  return (
    <div style={styles.container}>
      <div style={styles.header}>STDOUT</div>
      <div style={styles.body}>
        {outputs.map((output: string) => {
          return (
            <>
              {output ? output : null}
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
};

const getStyles = (Colors: any, fontSize: number) => {
  return {
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column" as "column",
    },
    header: {
      backgroundColor: Colors.primary_2,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
      paddingBottom: 4,
      color: Colors.constantBlack,
    },
    body: {
      backgroundColor: Colors.white_2,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
      paddingBottom: 4,
      color: Colors.black,
      fontSize,
      overflow: "auto",
      flex: 1,
    },
  };
};

export default React.memo(Stdout);
