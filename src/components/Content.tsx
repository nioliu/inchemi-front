import {Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {LoginComp} from "./LoginComp.tsx";
import {useState} from "react";

interface ContentProps {
    className?: string;
}

/**
 *
 * @param props
 * @constructor
 */
export function Content(props: ContentProps) {
    const className = "" + props.className

    return (
        <div className={className}
             style={{display: "flex", flexDirection: "column", height: "100vh", overflow: "auto"}}>
            <Header></Header>
            <div className={"content"} style={{
                overflow: "auto",
                flexGrow: "1"
            }}>
                <Outlet></Outlet>
            </div>
        </div>
    );
}

function Header() {
    const [showLogin, setShowLogin] = useState(false);

    function loginCallBack(action: number) {
        switch (action) {
            case -1:
                setShowLogin(false);
                break;
            default:
            // Handle other actions
        }
    }

    function handleClickLogin() {
        setShowLogin(true)
    }

    return (
        <>
            <div className={"flex-row-reverse"} style={{
                height: "70px",
                display: "flex",
                alignItems: "center",
                padding: "20px",
                gap: "10px",
                backgroundColor: "#e76f51",
            }}>
                {/*    personal information*/}
                <Button variant={"primary"} onClick={handleClickLogin}>Login</Button>
                {showLogin && <LoginComp callback={loginCallBack}></LoginComp>}
                {/*search*/}
                <div className="group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                        <g>
                            <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                            ></path>
                        </g>
                    </svg>
                    <input className="input" type="search" placeholder="Search"/>
                </div>
            </div>
        </>
    )
}
