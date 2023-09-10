import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./Component2.css";

type Component2Type = {
  /** Style props */
  propTop?: CSSProperties["top"];
  propLeft?: CSSProperties["left"];
};

const Component2: FunctionComponent<Component2Type> = ({
  propTop,
  propLeft,
}) => {
  const component2Style: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      left: propLeft,
    };
  }, [propTop, propLeft]);

  return (
    <div className="component-2" style={component2Style}>
      <div className="div20">Игры</div>
    </div>
  );
};

export default Component2;
