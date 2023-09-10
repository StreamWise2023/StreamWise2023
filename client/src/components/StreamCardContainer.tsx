import { FunctionComponent } from "react";
import "./StreamCardContainer.css";

type StreamCardContainerType = {
  streamSource?: string;
  streamTitle?: string;
};

const StreamCardContainer: FunctionComponent<StreamCardContainerType> = ({
  streamSource = "/image-12@2x.png",
  streamTitle,
}) => {
  return (
    <div className="frame-parent4">
      <div className="image-9-parent">
        <img className="image-9-icon" alt="" src="/image-9@2x.png" />
        <img className="image-9-icon" alt="" src={streamSource} />
        <div className="rectangle-group">
          <div className="frame-child2" />
          <div className="div18">45:43</div>
        </div>
      </div>
      <div className="text1">
        <div className="rainbowsix-siege">{streamTitle}</div>
        <div className="ellipse-container">
          <div className="frame-child3" />
          <div className="frame-child3" />
          <div className="frame-child3" />
        </div>
      </div>
      <div className="ellipse-parent1">
        <img className="frame-child6" alt="" src="/ellipse-18@2x.png" />
        <div className="impulse-group">
          <div className="impulse1">9impulse</div>
          <div className="div19">День назад</div>
        </div>
      </div>
    </div>
  );
};

export default StreamCardContainer;
