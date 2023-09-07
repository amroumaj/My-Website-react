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
/*     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<about />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router> */
  );
}
export default Navbar;