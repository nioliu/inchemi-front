import React, {useRef, useState} from "react";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();
    const handleClickBtn = function (event: React.MouseEvent<HTMLButtonElement>, path: string) {
        console.info('click btn', event, path)
        navigate(path)
    }

    // btns
    const sideBarBtns = [
        {
            name: "Upload", path: "/upload"
        },
        {
            name: "History", path: "/history"
        },
        {
            name: "Button3", path: "/btn3"
        }];

    // find the true index
    const currPath = useLocation().pathname;
    const btns = sideBarBtns.map((v, i) => {
        // mark selected btn
        const currClassName =
            v.path == currPath ? "menu-btn menu-btn-choose" : "menu-btn"
        return (
            <button key={i} className={currClassName} onClick={(event) => {
                handleClickBtn(event, v.path);
            }}>{v.name}</button>
        )
    })

    const [isVisible, setIsVisible] = useState(true);

    const handleClickHide = function () {
        setIsVisible((isVisible) => !isVisible);
    };

    return (
        <>
            <div style={{
                position: "sticky",
                top: "0px",
                width: isVisible ? "200px" : "auto",
                overflow: "hidden",
                transition: "all 0.3s ease", // 过渡动画
            }}>
                <div style={{}}>
                    <div className="top-area" style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse"
                    }}>
                        <button onClick={handleClickHide}>{isVisible ? 'Hide' : 'Show'}</button>
                        {isVisible && <div className="logo-area">This is logo area</div>}
                    </div>
                    {isVisible && (
                        <div className="btn-area"
                             style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 alignItems: "flex-start"
                             }}>
                            {btns}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
