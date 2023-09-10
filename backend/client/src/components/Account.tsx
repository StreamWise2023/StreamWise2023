import {type CSSProperties, FunctionComponent, useMemo} from "react";
import Avataronline from "./Avataronline";
import "./Property1default.css";

type AccountType = {
    imageDimensions?: string;
    personInfo?: string;
    emailAddress?: string;
    showFree?: boolean;

    /** Style props */
    accountFlex?: CSSProperties["flex"];
};

const Account: FunctionComponent<AccountType> = ({
                                                     imageDimensions,
                                                     personInfo,
                                                     emailAddress,
                                                     showFree,
                                                     accountFlex,
                                                 }) => {
    const accountStyle: CSSProperties = useMemo(() => {
        return {
            flex: accountFlex,
        };
    }, [accountFlex]);

    return (
        <div className="property-1default" style={accountStyle}>
            <Avataronline
                customer11="/customer1-13@2x.png"
                avataronlinePosition="relative"
            />
            <div className="frame-parent3">
                <div className="tran-mau-tri-tam-parent">
                    <div className="tran-mau-tri">{personInfo}</div>
                    {showFree && (
                        <div className="free">
                            <b className="free1">Free</b>
                        </div>
                    )}
                </div>
                <div className="tamui8net">{emailAddress}</div>
            </div>
        </div>
    );
};

export default Account;
