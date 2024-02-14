import { Outlet, } from "react-router-dom";

export function Root(props) {
    const { children } = props;
    return(
        <>
            <nav>
                <p>website name</p>
                <button>login</button>
            </nav>
            <main>
                { children || <Outlet /> }
            </main>
            <footer>
                <p>footer</p>
            </footer>
            {/* children will display the error page if an invalid route is requested */}
            
        </>
    )
}