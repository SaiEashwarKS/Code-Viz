/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";
import { Canvas, TitleBar, ControlBar, Stdout } from "./components";
import {
  init_variables,
  step_backward,
  step_forward,
  visualiseInitialStack,
  skip_to_end,
  skip_to_beginning,
  vis_pause,
  vis_play,
  setConfig,
  stdoutExists,
} from "./visualiseUtils";
import { ConfigContext } from "./config";
import { InputContext } from "./codeStore";

const Visualiser = () => {
  const [canvasRef, setCanvasRef] = useState(null);
  const [aceMarker, setAceMarker] = useState([
    {
      className: "aceMarker",
      type: "line",
    },
  ]);

  const { input } = useContext(InputContext);

  const { config } = useContext(ConfigContext);
  const { fontSize, Colors, isDark } = config;

  const styles = useMemo(() => getStyles(Colors), [isDark]);
  const [aceTheme, setAceTheme] = useState({ theme: "xcode" });

  const [stdout, setStdout] = useState([]);
  const showStdout = stdoutExists();

  /**
   * @param {{STDOUT:string, lineNum: string}} digraph
   */
  const displayStdout = (digraph) => {
    setStdout((prevStdout) => [...prevStdout, `${digraph["STDOUT"]}`]);
  };

  useEffect(() => {
    if (canvasRef && input.code) {
      init_variables(input.trace, canvasRef, setMarker, config, displayStdout);
      visualiseInitialStack(canvasRef);
    }

    return () => {
      //TODO
      //STOP VISUALISATION
    };
  }, [canvasRef]);

  useEffect(() => {
    setConfig(config);
  }, [fontSize, isDark]);

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
      <div style={styles.titleContainer}>
        <TitleBar />
      </div>
      <div style={styles.canvasContainer}>
        <div style={styles.leftContainer}>
          <div
            style={{
              ...styles.canvas,
              height: showStdout ? "80%" : "100%",
            }}
          >
            <AceEditor
              value={input.code}
              mode={input.mode}
              markers={aceMarker}
              readOnly
              fontSize={fontSize}
              width={"100%"}
              height={"100%"}
              {...aceTheme}
            />
          </div>
          {showStdout ? (
            <div style={{ ...styles.canvas, ...styles.stdout }}>
              <Stdout outputs={stdout} />
            </div>
          ) : null}
        </div>
        <div style={{ ...styles.canvas, marginLeft: 0 }}>
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
    leftContainer: {
      flexDirection: "column",
      flex: 1,
      marginRight: 0,
    },
    stdout: {
      height: "18%",
    },
    canvas: {
      display: "flex",
      flex: 1,
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
      margin: 16,
      marginTop: 0,
      overflow: "scroll",
      backgroundColor: Colors.white_2,
      height: "100%",
      // position: "relative",
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
