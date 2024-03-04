import ReactDOM from "react-dom";
import {useState} from "react";
import close from '../assets/close.svg'

/**
 * login
 * @constructor
 */

export function LoginComp({callback}: { callback: (action: number) => void }) {
    // 确保在 document.querySelector('#root') 找到挂载点时才渲染 Portal
    const portalRoot = document.querySelector('#root');
    return (
        <>{
            portalRoot && ReactDOM.createPortal(
                <Login callback={callback}/>, // 作为 JSX 传递
                portalRoot
            )}
        </>
    );
}


function Login({callback}: { callback: (action: number) => void }) {
    const [isLogin, setIsLogin] = useState(true);

    function handleClickSignIn() {
        setIsLogin(false)
    }

    function handleClickRegister() {
        setIsLogin(true)
    }

    function handleClickClose() {
        callback(-1)
    }

    return (
        <div className={"login-and-register"}>

            {/*login*/}
            {isLogin && <div className={"login-area"}>
                <form className="form">
                    <p className="title">Login </p>
                    <p className="message">Signup now and get full access to our app. </p>
                    <label>
                        <input required={true} placeholder="" type="email" className="input"/>
                        <span>Email</span>
                    </label>

                    <label>
                        <input required={true} placeholder="" type="password" className="input"/>
                        <span>Password</span>
                    </label>
                    <button className="submit">Submit</button>
                    <p className="signin">Don't have an account yet?&nbsp;
                        <strong className={"signIn"}
                                onClick={handleClickSignIn}>Register
                        </strong>
                    </p>
                    <img className={"close-img"} src={close} alt={"load failed"} onClick={handleClickClose}/>
                </form>

            </div>
            }
            {/*register*/}
            {!isLogin && <div className={"register-area"}>
                <form className="form">
                    <p className="title">Register </p>
                    <p className="message">Signup now and get full access to our app. </p>
                    <div className="flex">
                        <label>
                            <input required={true} placeholder="" type="text" className="input"/>
                            <span>Firstname</span>
                        </label>

                        <label>
                            <input required={true} placeholder="" type="text" className="input"/>
                            <span>Lastname</span>
                        </label>
                    </div>

                    <label>
                        <input required={true} placeholder="" type="email" className="input"/>
                        <span>Email</span>
                    </label>

                    <label>
                        <input required={true} placeholder="" type="password" className="input"/>
                        <span>Password</span>
                    </label>
                    <label>
                        <input required={true} placeholder="" type="password" className="input"/>
                        <span>Confirm password</span>
                    </label>
                    <button className="submit">Submit</button>
                    <p className="signin">Already have an account?&nbsp;
                        <strong className={"signIn"}
                                onClick={handleClickRegister}>
                            SignIn
                        </strong>
                    </p>
                    <img className={"close-img"} src={close} alt={"load failed"} onClick={handleClickClose}/>
                </form>

            </div>}

        </div>
    )
}
