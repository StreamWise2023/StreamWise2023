import React from 'react';
import "./VideoCard.css";
import {useSnapshot} from "valtio";
import {store} from "../Store";
import {motion} from "framer-motion";

const VideoCard = (props: any) => {
    const videos = useSnapshot(store)
    return (
        <motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className="frame-container"
                    onClick={() => console.log([`sendMetric: #${props.video.id * 891289} was viewed `])}>
            <div className="frame-div">
                <div className="frame-wrapper">
                    <img className="image-icon" alt="" src={props.video.image}/>
                    <div className="rectangle-parent">
                        <div className="frame-child"/>
                        <div className="div">{props.video.timing}</div>
                    </div>
                </div>
                <div className="text">
                    <div className="csgo">{props.video.title}</div>
                    <div className="ellipse-parent">
                        <div className="frame-item"/>
                        <div className="frame-item"/>
                        <div className="frame-item"/>
                    </div>
                </div>
                <div className="group">
                    <div className="ellipse-group">
                        <img
                            className="ellipse-icon"
                            alt=""
                            src="/ellipse-18@2x.png"
                        />
                        <div className="impulse-group">
                            <div className="impulse">{props.video.author}</div>
                            <div className="div1">Неделю назад</div>
                        </div>
                    </div>
                    <div className="like-dislike">
                        <img src={`/${props.video.is_liked ? 'fill-' : ''}thumbIcon.svg`} alt="like"
                             onClick={(e) => {
                                 props.video.is_liked = !props.video.is_liked
                                 e.stopPropagation()
                             }}/>
                        <img src={`/${props.video.is_disliked ? 'fill-' : ''}thumbIcon.svg`}
                             style={{transform: 'rotate(180deg)'}}
                             alt="dislike" onClick={(e) => {
                            props.video.is_disliked = !props.video.is_disliked
                            e.stopPropagation()
                        }}/>
                    </div>
                </div>
            </div>

            <div className="category">
                <div className="div20">{props.video.category}</div>
            </div>
        </motion.div>
    );
};

export default VideoCard;