import { Link } from 'react-router-dom';


const Navbar = ()=>{
    return(
      <nav className="navbar">
      <h1>My website</h1>
      <div className="nav-list">
            <Link to ="/">Home</Link>
            <Link to ="/about">About</Link>
            <Link to ="/Register">Sign up</Link>
            <Link to ="/Login">Login</Link>
      </div>
      </nav>

  );
}
export default Navbar;