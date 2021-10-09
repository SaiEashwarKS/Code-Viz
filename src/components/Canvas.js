import React, { useEffect, useRef } from "react";
import { startVisualisation } from "../visualiseUtils";

const Canvas = ({ visualise }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    startVisualisation(canvasRef);
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
