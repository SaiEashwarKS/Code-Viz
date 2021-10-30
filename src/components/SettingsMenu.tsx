import { useCallback, useContext, useMemo } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Colors } from "../colors";
import { ThemeContext } from "../theme";

type propsType = {
  style?: React.CSSProperties;
};

const SettingsMenu = ({ style }: propsType) => {
  const { Colors, isDark, setIsDark } = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(Colors), [isDark]);
  const onModeToggleChange = useCallback(
    (e: any) => {
      setIsDark(e.target.checked);
    },
    [isDark]
  );
  return (
    <div style={{ ...styles.container, ...style }}>
      <span style={styles.labelContainer}>Dark Mode</span>
      <Toggle icons={false} onChange={onModeToggleChange} checked={isDark} />
    </div>
  );
};

const getStyles = (Colors: any) => {
  return {
    container: {
      position: "absolute" as "absolute",
      top: 90,
      right: 16,
      backgroundColor: Colors.primary_2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      userSelect: "none" as "none",
    },
    labelContainer: {
      marginRight: 4,
      alignSelf: "flex-start",
    },
  };
};

export default SettingsMenu;
