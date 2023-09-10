import {FunctionComponent, useState} from "react";
import FormCard from "./FormCard";
import Account from "./Account";
import "./SideBar.css";
import {NavLink} from "react-router-dom";

const SideBar: FunctionComponent = () => {
    const [categories, setCategories] = useState([{
        'title': '_will-view', 'count': 48, 'color': '#404546'
    }, {
        'title': '_will-like', 'count': 16, 'color': '#8E55EA'
    },
        {
            'title': '_date-time', 'count': 8, 'color': '#3E90F0'
        }, {
            'title': '_face-meta', 'count': 128, 'color': '#D84C10'
        },
    ])
    return (
        <nav className="nav-sidebar">
            <div className="top">
                <div className="logo-top">
                    <div className="it-parent">
                        <img src="/logo-ist.svg" alt="logo"/>
                    </div>
                    <div className="frame11">
                        <b className="streamwise">StreamWise</b>
                        <div className="btn">
                            <img className="burger btn" alt="" src="/collapse-icon.svg"/>
                        </div>
                    </div>
                </div>
                <div className="main-menus">
                    <NavLink to={"/"} className="menu-tab">
                        <img className="burger" alt="" src="/chattext1-1.svg"/>
                        <div className="div5">Главная</div>
                    </NavLink>
                    <div className="menu-tab">
                        <img className="burger" alt="" src="/search-1.svg"/>
                        <div className="div5">Плеер</div>
                    </div>
                    <div className="menu-tab">
                        <img className="burger" alt="" src="/bankcardcheckoulc-1.svg"/>
                        <div className="div5">Подписки</div>
                    </div>
                    <NavLink to={"/liked"} className="menu-tab">
                        <img className="burger" alt="" src="/barcode2-1.svg"/>
                        <div className="div5">Понравившиеся</div>
                    </NavLink>
                    <NavLink to={"/best-rec"} className="menu-tab">
                        <img className="burger" alt="" src="/star.svg"/>
                        <div className="div5">Лучшие рекомендации</div>
                    </NavLink>
                </div>
                <div className="chat-listexpanded">
                    <div className="chat-list-title">
                        <div className="chevron-down-parent">
                            <button className="chevron-down">
                                <img className="icon" alt="" src="/icon.svg"/>
                            </button>
                            <div className="title-bold">Рекомендуемое</div>
                        </div>
                        <div className="iconplaceholder-parent">
                            <img
                                className="burger"
                                alt=""
                                src="/iconplaceholder.svg"
                            />
                            <img
                                className="burger"
                                alt=""
                                src="/iconplaceholder.svg"
                            />
                        </div>
                    </div>
                    <div className="list-stack">
                        {categories.map(({title, count, color}) => (
                            <NavLink key={title} to={`/category/${title}`} className="menu-tab">
                                <div className="color">
                                    <div className="color-child" style={{backgroundColor: color}}/>
                                </div>
                                <div className="div5">{title}</div>
                                <div className="wrapper">
                                    <div className="f">{count}</div>
                                </div>
                            </NavLink>
                        ))}
                        <div className="menu-tab">
                            <FormCard/>
                            <div className="new-list">Новая подборка</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="userfree">
                    <Account
                        imageDimensions="/customer1-1@2x.png"
                        personInfo="МиМиМаМоМу"
                        emailAddress="О себе"
                        showFree={false}
                        accountFlex="1"
                    />
                    <button className="settings title-bold">Настройки</button>
                </div>
                <div className="theme-togglelight">
                    <div className="toggle-item">
                        <img className="theme-icon" alt="" src="/sun.svg"/>
                        <div className="f">Light</div>
                    </div>
                    <div className="toggle-item active-theme">
                        <img className="theme-icon" alt="" src="/moon01.svg"/>
                        <div className="f">Dark</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SideBar;
