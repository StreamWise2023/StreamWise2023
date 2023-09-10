import {FunctionComponent, useEffect} from "react";
import "./Login.css";

const Login: FunctionComponent = () => {
    useEffect(() => {
        const scrollAnimElements = document.querySelectorAll(
            "[data-animate-on-scroll]"
        );
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        const targetElement = entry.target;
                        targetElement.classList.add("animate");
                        observer.unobserve(targetElement);
                    }
                }
            },
            {
                threshold: 0.15,
            }
        );

        for (let i = 0; i < scrollAnimElements.length; i++) {
            observer.observe(scrollAnimElements[i]);
        }

        return () => {
            for (let i = 0; i < scrollAnimElements.length; i++) {
                observer.unobserve(scrollAnimElements[i]);
            }
        };
    }, []);
    return (
        <div className="div21" data-animate-on-scroll>
            <form action={"/"} className="edit-profileon">
                <h1 className="h1">Войти в профиль</h1>
                <div className="edit-profile">
                    <div className="name-group">
                        <div className="form-item">
                            <div className="div22">Имя</div>
                            <input
                                className="input"
                                type="text"
                                placeholder="Введите логин"
                                autoComplete="name"
                            />
                        </div>
                        <div className="form-item">
                            <div className="div22">Пароль</div>
                            <input
                                className="input"
                                type="password"
                                placeholder="Введите пароль"
                                autoComplete="password"
                            />
                        </div>
                    </div>
                </div>
                <div className="button-parent">
                    <button className="button2">
                        <img
                            className="arrow-circle-right-icon"
                            alt=""
                            src="/arrowcircleright.svg"
                        />
                        <div className="new-chat">Войти</div>
                        <img
                            className="arrow-circle-right-icon"
                            alt=""
                            src="/arrowcircleright.svg"
                        />
                    </button>
                    <b className="b">или</b>
                    <div className="div24">Зарегистрироваться</div>
                </div>
            </form>
        </div>
    );
};

export default Login;
