import {type CSSProperties, FunctionComponent, useMemo} from "react";
import Avatar07 from "./Avatar07";
import "./Avataronline.css";

type AvataronlineType = {
    customer11?: string;

    /** Style props */
    avataronlinePosition?: CSSProperties["position"];
};

const Avataronline: FunctionComponent<AvataronlineType> = ({
                                                               customer11,
                                                               avataronlinePosition,
                                                           }) => {
    const avataronlineStyle: CSSProperties = useMemo(() => {
        return {
            position: avataronlinePosition,
        };
    }, [avataronlinePosition]);

    return (
        <div className="avataronline" style={avataronlineStyle}>
            <Avatar07
                customer11="/customer1-12@2x.png"
                avatar07BorderRadius="25px"
                avatar07Width="100%"
                avatar07Height="100%"
                avatar07Position="absolute"
                avatar07Top="0%"
                avatar07Right="0%"
                avatar07Bottom="0%"
                avatar07Left="0%"
            />
            <div className="online-dot">
                <div className="online-dot-child"/>
            </div>
        </div>
    );
};

export default Avataronline;
