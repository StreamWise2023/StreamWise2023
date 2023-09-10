import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./StyleghostThemeoffState.css";

type StyleghostThemeoffStateType = {
  buttonText?: string;

  /** Style props */
  styleghostThemeoffStateBoxSizing?: CSSProperties["boxSizing"];
  styleghostThemeoffStateCursor?: CSSProperties["cursor"];
  styleghostThemeoffStateBackgroundColor?: CSSProperties["backgroundColor"];
  styleghostThemeoffStateAlignSelf?: CSSProperties["alignSelf"];
  buttonDisplay?: CSSProperties["display"];
};

const StyleghostThemeoffState: FunctionComponent<
  StyleghostThemeoffStateType
> = ({
  buttonText,
  styleghostThemeoffStateBoxSizing,
  styleghostThemeoffStateCursor,
  styleghostThemeoffStateBackgroundColor,
  styleghostThemeoffStateAlignSelf,
  buttonDisplay,
}) => {
  const styleghostThemeoffStateStyle: CSSProperties = useMemo(() => {
    return {
      boxSizing: styleghostThemeoffStateBoxSizing,
      cursor: styleghostThemeoffStateCursor,
      backgroundColor: styleghostThemeoffStateBackgroundColor,
      alignSelf: styleghostThemeoffStateAlignSelf,
    };
  }, [
    styleghostThemeoffStateBoxSizing,
    styleghostThemeoffStateCursor,
    styleghostThemeoffStateBackgroundColor,
    styleghostThemeoffStateAlignSelf,
  ]);

  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      display: buttonDisplay,
    };
  }, [buttonDisplay]);

  return (
    <div
      className="styleghost-themeoff-state"
      style={styleghostThemeoffStateStyle}
    >
      <div className="button1" style={buttonStyle}>
        {buttonText}
      </div>
    </div>
  );
};

export default StyleghostThemeoffState;
