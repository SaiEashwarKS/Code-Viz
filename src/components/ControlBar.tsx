import { useContext } from "react";
// import { Colors } from "../colors";
import { ThemeContext } from "../theme";

type propsType = {
  onStart?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onStepForward?: () => void;
  onStepBackWard?: () => void;
  onSkipToEnd?: () => void;
  onSkipToBeginning?: () => void;
};

const ControlBar = (props: propsType) => {
  const {
    onPlay,
    onPause,
    onStepForward,
    onStepBackWard,
    onSkipToBeginning,
    onSkipToEnd,
  } = props;

  const { Colors } = useContext(ThemeContext);
  const styles = getStyles(Colors);
  return (
    <div style={styles.container}>
      {onPlay && (
        <button onClick={onPlay} style={styles.button}>
          Play
        </button>
      )}
      {onPause && (
        <button onClick={onPause} style={styles.button}>
          Pause
        </button>
      )}
      {onStepForward && (
        <button onClick={onStepForward} style={styles.button}>
          Step forward
        </button>
      )}
      {onStepBackWard && (
        <button onClick={onStepBackWard} style={styles.button}>
          Step back
        </button>
      )}
      {onSkipToBeginning && (
        <button onClick={onSkipToBeginning} style={styles.button}>
          Skip to beginning
        </button>
      )}
      {onSkipToEnd && (
        <button
          onClick={onSkipToEnd}
          style={{ ...styles.button, marginRight: 0 }}
        >
          Skip to end
        </button>
      )}
    </div>
  );
};

const getStyles = (Colors: any) => {
  return {
    container: {
      display: "flex",
      flexDirection: "row" as "row", //to prevent ts error
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
      padding: 5,
      backgroundColor: Colors.white_1,
    },
    button: {
      marginRight: 5,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: Colors.primary_2,
    },
  };
};

export default ControlBar;
