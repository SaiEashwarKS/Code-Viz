// import Iframe from "react-iframe";
// import Container from "react-bootstrap/Container";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-c_cpp";
// import "ace-builds/src-noconflict/theme-xcode";
// import "ace-builds/src-noconflict/ext-language_tools";
import { useContext, useEffect, useMemo, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";
import { Canvas, TitleBar, ControlBar } from "./components";
// import { init_variables, skip_backward, skip_forward, startVisualisation, visualiseInitialStack, vis_backward, vis_forward, vis_pause, vis_play } from "./visualiseUtils";
import {
  init_variables,
  setIsDark,
  step_backward,
  step_forward,
  visualiseInitialStack,
  skip_to_end,
  skip_to_beginning,
  vis_pause,
  vis_play,
} from "./visualiseUtils";
import { ThemeContext } from "./theme";

const Visualiser = ({ code, mode }) => {
  const [canvasRef, setCanvasRef] = useState(null);
  const [aceMarker, setAceMarker] = useState([
    {
      className: "aceMarker",
      type: "line",
    },
  ]);

  const { Colors, isDark } = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(Colors), [isDark]);
  const [aceTheme, setAceTheme] = useState({ theme: "xcode" });

  useEffect(() => {
    if (canvasRef) {
      init_variables(canvasRef, setMarker, isDark);
      visualiseInitialStack(canvasRef);
    }
    return () => {
      //TODO
      //STOP VISUALISATION
    };
  }, [canvasRef]);

  useEffect(() => {
    setIsDark(isDark);
  }, [isDark]);

  useEffect(() => {
    const marker = document.getElementsByClassName("aceMarker")[0];
    if (marker) {
      marker.style.backgroundColor = Colors.primary_2;
    }
  });

  useEffect(() => {
    if (isDark) {
      setAceTheme({ theme: "vibrant_ink" });
    } else {
      setAceTheme({ theme: "xcode" });
    }
  }, [isDark]);

  const setMarker = (lineNo) => {
    setAceMarker((prevState) => {
      return [
        {
          ...prevState[0],
          startRow: lineNo - 1,
          endRow: lineNo,
        },
      ];
    });
  };

  return (
    <div className="visualiser" style={styles.container}>
      {/* <Iframe src="../LL.html" width="100%" height="900"></Iframe> */}
      <div style={styles.titleContainer}>
        <TitleBar />
      </div>
      <div style={styles.canvasContainer}>
        <div style={{ ...styles.canvas, marginRight: 0 }}>
          <AceEditor
            value={code}
            mode={mode}
            markers={aceMarker}
            readOnly
            fontSize={16}
            width={"100%"}
            height={"100%"}
            {...aceTheme}
          />
        </div>
        <div style={styles.canvas}>
          <Canvas setCanvasRef={setCanvasRef} />
        </div>
      </div>
      <div style={styles.controlBarContainer}>
        <ControlBar
          onPause={vis_pause}
          onPlay={vis_play}
          onStepForward={step_forward}
          onStepBackWard={step_backward}
          onSkipToBeginning={skip_to_beginning}
          onSkipToEnd={skip_to_end}
        />
      </div>
    </div>
  );
};

const getStyles = (Colors) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height: "100vh",
    },
    titleContainer: {
      justifyContent: "flex-start",
    },
    canvasContainer: {
      display: "flex",
      flexDirection: "row",
      height: "88vh",
      flex: 1,
    },
    canvas: {
      display: "flex",
      flex: 1,
      height: "100%",
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
      margin: 16,
      marginTop: 0,
      overflow: "scroll",
      backgroundColor: Colors.white_2,
    },
    controlBarContainer: {
      margin: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
};

export default Visualiser;
