import {FunctionComponent, useEffect, useState} from "react";
import "./Main.css";
import VideoCard from "../components/VideoCard";
import {useSnapshot} from "valtio";
import {store} from "../Store";
import {useParams} from "react-router-dom";
import {motion} from "framer-motion";
import Loader from "../components/Loader";

const Category: FunctionComponent = () => {
    const {title} = useParams()
    const videos = useSnapshot(store)
    const [filtered, setFiltered] = useState([...videos])
    useEffect(() => {
        setTimeout(() => {
            console.log(title);
            switch (title) {
                case '_will-view':
                    setFiltered(videos.filter(video => video.category == "Игры" || video.category == "Развлекательное"))
                    break;
                case '_will-like':
                    setFiltered([...videos.filter(video => video.category == "Спорт" || video.category == "Познавательное"), videos[9], videos[5]])
                    break;
                case '_face-meta':
                    setFiltered([...videos.filter(video => video.category == "Игры").slice(0, 3), videos[7], videos[6]])
                    break;
                default:
                    setFiltered([...videos])
            }
        }, 300);
    }, [title])
    return (
        <>
            {title == '_date-time' ? <Loader/> :
                <motion.div className="video-wrap">
                    {filtered.sort((a, b) => (a.title > b.title) ? 1 : -1).map((video) => (
                        <VideoCard key={video.id} video={video}/>
                    ))}
                </motion.div>}

        </>
    );
};

export default Category;
