import React, {useRef, useState} from "react";
import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import upload from '../assets/upload.svg'
import history from '../assets/history.svg'

export function Sidebar() {
    const navigate = useNavigate();
    const handleClickBtn = function (event: React.MouseEvent<HTMLButtonElement>, path: string) {
        console.info('click btn', event, path)
        navigate(path)
    }
    const [isVisible, setIsVisible] = useState(true);

    const handleClickHide = function () {
        setIsVisible((isVisible) => !isVisible);
    };

    // btns
    const sideBarBtns = [
        {
            name: "Upload", path: "/upload", iconSrc: upload
        },
        {
            name: "History", path: "/history",iconSrc: history
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
            <button key={i} className={currClassName}
                    onClick={(event) => {
                        handleClickBtn(event, v.path);
                    }}
                    style={{
                        width: !isVisible ? "40px" : undefined,
                    }}>
                <img src={v.iconSrc} alt={"load failed"} ></img>
                {isVisible && <strong>{v.name}</strong>}
            </button>
        )
    })


    return (
        <>
            <div style={{
                position: "sticky",
                top: "10px",
                width: isVisible ? "200px" : "80px",
                overflow: "hidden",
                transition: "all 0.5s ease", // 过渡动画
            }}>
                <div style={{}}>
                    <div className="top-area" style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse"
                    }}>
                        <button onClick={handleClickHide} style={{
                            width: "50px",
                            margin: "auto"
                        }}>{isVisible ? 'Hide' : 'Show'}</button>
                        {isVisible && <div className="logo-area" style={{
                            textWrap: "nowrap"
                        }}>This is logo area</div>}
                    </div>

                    <div className="btn-area"
                         style={{
                             display: "flex",
                             flexDirection: "column",
                             alignItems: "center",
                         }}>
                        {btns}
                    </div>

                </div>
            </div>
        </>
    );
}
