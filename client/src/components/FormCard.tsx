import { FunctionComponent } from "react";
import "./FormCard.css";
const FormCard: FunctionComponent = () => {
  return (
    <div className="plus-circle">
      <div className="stroke" />
      <img className="stroke-icon" alt="" src="/stroke.svg" />
      <img className="stroke-icon1" alt="" src="/stroke1.svg" />
    </div>
  );
};

export default FormCard;
