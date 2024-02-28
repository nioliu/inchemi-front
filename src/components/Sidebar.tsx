import React, {useState} from "react";

export function Sidebar() {
    /**
     * show corresponding content
     * @param event
     */
    const handleClickBtn = function (event: React.MouseEvent<HTMLButtonElement>) {
        console.info('click btn', event)
    }

    const sideBarBtns = ["Button1", "Button2", "Button3"];

    const [activeBtnIndex, setActiveBtnIndex] = useState(0);
    const btns = sideBarBtns.map((v, i) => {
        // mark selected btn
        const currClassName = activeBtnIndex == i ? "menu-btn menu-btn-choose" : "menu-btn"
        return (
            <>
                <button className={currClassName} onClick={(event) => {
                    setActiveBtnIndex(i)
                    handleClickBtn(event);
                }}>{v}</button>
            </>
        )
    })
    return (
        <div style={{
            position: "relative"
        }}>
            <div style={{
                width: "200px",
                position: "fixed",
                minHeight: "100vh",
            }}>
                <div className="logo-area">
                    This is logo area
                </div>
                <div className="btn-area"
                     style={{
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "flex-start"
                     }}>
                    {btns}
                </div>
            </div>
        </div>
    )
}
