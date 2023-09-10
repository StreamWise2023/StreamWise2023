import React from 'react';
import './Loader.css'

const Loader = () => {
    return (
        <div className="center">
            <h2>Собираем и анализируем метрики...</h2>
            <svg className="pl3" viewBox="0 0 128 128" width="128px" height="128px">
                <g fill="var(--primary)">
                    <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)"/>
                    <g className="pl3__rect-g" transform="scale(-1,-1)">
                        <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)"/>
                    </g>
                </g>
                <g fill="#C543EB" mask="url(#pl-mask)">
                    <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)"/>
                    <g className="pl3__rect-g" transform="scale(-1,-1)">
                        <rect className="pl3__rect" rx="8" ry="8" width="64" height="64" transform="translate(64,0)"/>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default Loader;