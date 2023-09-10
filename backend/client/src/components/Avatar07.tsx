import {type CSSProperties, FunctionComponent, useMemo} from "react";
import "./Avatar07.css";

type Avatar07Type = {
    customer11?: string;
    /** Style props */
    avatar07BorderRadius?: CSSProperties["borderRadius"];
    avatar07Width?: CSSProperties["width"];
    avatar07Height?: CSSProperties["height"];
    avatar07Position?: CSSProperties["position"];
    avatar07Top?: CSSProperties["top"];
    avatar07Right?: CSSProperties["right"];
    avatar07Bottom?: CSSProperties["bottom"];
    avatar07Left?: CSSProperties["left"];
};

const Avatar07: FunctionComponent<Avatar07Type> = ({
                                                       customer11,
                                                       avatar07BorderRadius,
                                                       avatar07Width,
                                                       avatar07Height,
                                                       avatar07Position,
                                                       avatar07Top,
                                                       avatar07Right,
                                                       avatar07Bottom,
                                                       avatar07Left,
                                                   }) => {
    const avatar07Style: CSSProperties = useMemo(() => {
        return {
            borderRadius: avatar07BorderRadius,
            width: avatar07Width,
            height: avatar07Height,
            position: avatar07Position,
            top: avatar07Top,
            right: avatar07Right,
            bottom: avatar07Bottom,
            left: avatar07Left,
        };
    }, [
        avatar07BorderRadius,
        avatar07Width,
        avatar07Height,
        avatar07Position,
        avatar07Top,
        avatar07Right,
        avatar07Bottom,
        avatar07Left,
    ]);

    return (
        <div className="avatar07" style={avatar07Style}>
            <img className="customer-1-1-icon" alt="" src={customer11}/>
        </div>
    );
};

export default Avatar07;
