type propsType = {
  onStart: () => void;
  onStop: () => void;
  onStepForward: () => void;
  onStepBackWard: () => void;
  onSkipToEnd: () => void;
  onSkipToBeginning: () => void;
};

const ControlBar = (props: propsType) => {
  const {
    onStart,
    onStop,
    onStepForward,
    onStepBackWard,
    onSkipToBeginning,
    onSkipToEnd,
  } = props;
  return (
    <div style={styles.container}>
      {onStart && (
        <button onClick={onStart} style={styles.button}>
          Start Visualisation
        </button>
      )}
      {onStop && (
        <button onClick={onStop} style={styles.button}>
          Pause Visualisation
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row", //to prevent ts error
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
    padding: 5,
  },
  button: {
    marginRight: 5,
    borderWidth: 1,
    backgroundColor: "#d0d0d0",
  },
};

export default ControlBar;
