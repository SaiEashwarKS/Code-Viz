import React, { useEffect, useRef } from "react";
import { startVisualisation, visualiseInitialStack } from "../visualiseUtils";

const Canvas = ({ setMarker }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    visualiseInitialStack(canvasRef);
    setTimeout(() => startVisualisation(canvasRef, setMarker), 3000);
    return () => {
      //TODO
      //STOP VISUALISATION
    };
  }, []);

  return (
    <>
      <div style={styles.container} ref={canvasRef} id="canvas"></div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flex: 1,
    // backgroundColor: "#edeff2",
    margin: 16,
    justifyContent: "center",
    boxShadow: "4px 4px 4xp 4px black",
  },
};

export default Canvas;
