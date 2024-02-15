import { Outlet, } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export function Root() {
    let navigate = useNavigate()
    return(
        <>
            <nav>
                <h1><a href="/">Real Estate</a></h1>
                <button onClick={() => navigate("/addhome")}>Add Home</button>
                <button onClick={() => navigate("/login")}>Login</button>
            </nav>
            <hr></hr>
            <main>
                { <Outlet /> }
            </main>
            <hr></hr>
            <footer>
                <em>Real Estate Footer</em>
            </footer>
            
        </>
    )
}