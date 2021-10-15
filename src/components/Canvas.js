import { useEffect, useRef } from "react";

const Canvas = ({ setCanvasRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvasRef(canvasRef);
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
    margin: 16,
    justifyContent: "center",
    boxShadow: "4px 4px 4xp 4px black",
  },
};

export default Canvas;
