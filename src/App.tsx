import './App.css'
import {Sidebar} from "./components/Sidebar.tsx";
import {Content} from "./components/Content.tsx";

function App() {

    return (
        <div className={"container-xxl flex-row"} style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "flex-start"
        }}>
            <Sidebar></Sidebar>
            <Content className={"flex-grow-1"}></Content>
        </div>
    )
}

export default App
