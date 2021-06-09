import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Converter</Link>
                    </li>
                    <li>
                        <Link to="/exchange-rate">Exchange rate</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
