import {FunctionComponent, useState} from "react";
import VideoCard from "../components/VideoCard";
import {useSnapshot} from "valtio";
import {store} from "../Store";
import {motion} from "framer-motion";

const BestRec: FunctionComponent = () => {
    const videos = useSnapshot(store)
    const [filtered, setFiltered] = useState(store.filter(video => video.category == "Игры" || video.category == "Познавательное" || video.category == "Музыка"))
    return (
        <>
            <motion.div className="video-wrap">
                {filtered.sort((a, b) => (a.title > b.title) ? 1 : -1).map(video => {
                    return <VideoCard key={video.id} video={video}/>;
                })}
            </motion.div>
        </>
    );
};

export default BestRec;