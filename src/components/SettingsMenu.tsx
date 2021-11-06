import { useCallback, useContext, useMemo, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Colors } from "../colors";
import { ConfigContext } from "../config";

type propsType = {
  style?: React.CSSProperties;
};

const SettingsMenu = ({ style }: propsType) => {
  const { config, setConfig } = useContext(ConfigContext);
  const { Colors, isDark } = config;
  const styles = useMemo(() => getStyles(Colors), [isDark]);

  const onModeToggleChange = useCallback(
    (e: any) => {
      setConfig({ isDark: e.target.checked });
    },
    [isDark]
  );

  const [fontSize, setFontSize] = useState(config.fontSize);
  const onFontSizeChange = (fontInput: React.ChangeEvent<HTMLInputElement>) => {
    if (fontInput.target.value) {
      const size = Number.parseInt(fontInput.target.value);
      setConfig({ fontSize: size });
      setFontSize(size);
    }
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={styles.itemContainer}>
        <div style={styles.labelContainer}>
          <span>Dark Mode</span>
        </div>
        <div style={styles.valueContainer}>
          <Toggle
            icons={false}
            onChange={onModeToggleChange}
            checked={isDark}
          />
        </div>
      </div>
      <div style={styles.itemContainer}>
        <div style={styles.labelContainer}>
          <label>Font size</label>
        </div>
        <div style={styles.valueContainer}>
          <input
            type="number"
            min={8}
            max={40}
            step={2}
            value={fontSize}
            style={{
              ...styles.valueContainer,
              backgroundColor: Colors.white_2,
              color: Colors.black,
            }}
            onChange={onFontSizeChange}
            onKeyDown={(event) => {
              event.preventDefault();
            }}
          ></input>
        </div>
      </div>
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
      flexDirection: "column" as "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      userSelect: "none" as "none",
    },
    itemContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "row" as "row",
      marginTop: 10,
    },
    labelContainer: {
      marginRight: 4,
      display: "flex",
      flex: 2,
      justifyContent: "flex-start",
      minWidth: 150,
      // backgroundColor: "red",
    },
    valueContainer: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      width: 50,
      // backgroundColor: "blue",
    },
  };
};

export default SettingsMenu;
