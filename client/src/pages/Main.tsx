import {FunctionComponent} from "react";
import "./Main.css";
import VideoCard from "../components/VideoCard";
import {useSnapshot} from "valtio";
import {store} from "../Store";

const Main: FunctionComponent = () => {
    const videos = useSnapshot(store)
    return (
        <div className="chat">
            <div className="frame1">
                <div className="frame-parent">
                    {store.map((video) => (
                        <VideoCard key={video.id} video={video}/>
                    ))}
                </div>
            </div>
            <div className="frame5">
                <header className="frame6">
                    <div className="frame7">
                        <div className="backgound-image-parent">
                            <div className="backgound-image">
                                <div className="backgound-image-child"/>
                                <div className="frame8">
                                    <img
                                        className="group-icon"
                                        alt=""
                                        src="/group-45.svg"
                                    />
                                    <div className="image-5-parent">
                                        <img
                                            className="image-5-icon"
                                            alt=""
                                            src="/image-5@2x.png"
                                        />
                                        <img
                                            className="image-5-icon"
                                            alt=""
                                            src="/image-6@2x.png"
                                        />
                                        <img
                                            className="image-5-icon"
                                            alt=""
                                            src="/image-7@2x.png"
                                        />
                                        <img
                                            className="image-5-icon"
                                            alt=""
                                            src="/image-8@2x.png"
                                        />
                                    </div>
                                    <img
                                        className="group-icon"
                                        alt=""
                                        src="/group-44.svg"
                                    />
                                </div>
                            </div>
                            <div className="frame9">
                                <div className="frame-inner1">
                                    <div className="name-parent">
                                        <div className="name">
                                            <div className="game-of-trones">Game of Trones</div>
                                            <h4 className="season-3-series">
                                                Season 3, series 4
                                            </h4>
                                        </div>
                                        <div className="controls">
                                            <div className="btn">
                                                <div className="game-of-trones">Продолжить</div>
                                            </div>
                                            <div className="btn">
                                                <div className="game-of-trones">С начала</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="frame10">
                    <h2 className="h2">Популярные Видео</h2>
                    <div className="button">
                        <div className="div4">По умолчанию</div>
                        <img className="button-child" alt="" src="/vector-102.svg"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
