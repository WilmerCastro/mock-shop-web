import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar/navbar";
const Layout = () => {
    return (
        <>
            <div>
                <Navbar />
                <div
                    style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        padding: '80px 20px',
                    }}
                >
                    <Outlet />
                </div>
            </div>

        </>
    )
};

export default Layout;
