import { Link } from "react-router-dom"
import '../style/Header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className="header-logo">
        <h1>Stock React App</h1>
      </div>
      <div className="header-links">
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/stocks'>Stocks</Link>
          <Link to='/profile'>My profile</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header;