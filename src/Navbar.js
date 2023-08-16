//import {link} from 'react-router-dom';

const Navbar = ()=>{
    return(
        <nav className="navbar">
            <h1>My website</h1>
            <div className="nav-list">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/Sign-up">Sign up</a>
                    <a href="/login">Login</a>
            </div>
        </nav>
    );
}
export default Navbar;