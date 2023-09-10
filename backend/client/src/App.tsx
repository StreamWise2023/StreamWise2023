import {Route, Routes, useLocation, useNavigationType,} from "react-router-dom";
import Main from "./pages/Main";
import {useEffect} from "react";
import Category from "./pages/Category";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import BestRec from "./pages/BestRec";

function App() {
    const action = useNavigationType();
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action, pathname]);

    useEffect(() => {
        let title = "";
        let metaDescription = "";

        switch (pathname) {
            case "/":
                title = "StreamWise";
                metaDescription = "";
                break;
        }

        if (title) {
            document.title = title;
        }

        if (metaDescription) {
            const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
                'head > meta[name="description"]'
            );
            if (metaDescriptionTag) {
                metaDescriptionTag.content = metaDescription;
            }
        }
    }, [pathname]);

    return (
        <Routes>
            <Route path="/auth" element={<Login/>}/>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Main/>}/>
                <Route path={"category/:title"} element={<Category/>}/>
                <Route path={"best-rec"} element={<BestRec/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
