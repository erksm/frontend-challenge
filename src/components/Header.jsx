import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import '../source/styles/header.scss';
import '../source/styles/variables.scss';

const Header = () => {
    return(
        <header>
            <div className="block__container block__header">
                <div className="header__logo">
                    <Link to={'/'}><span>MARVEL</span> <span>Comics Store</span></Link>
                </div>
                <MiniCart />
            </div>
        </header>
    )
}

export default Header;