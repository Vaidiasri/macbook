import {navLinks} from "../constants";

const NavBar = () => {
    const handleNavClick = (label) => {
        const sectionId = `#${label.toLowerCase()}`;
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>
            <nav>
                <img  src="/logo.svg" alt="Apple logo" />

                <ul>
                    {navLinks.map(({ label }) => (
                        <li key={label}>
                            <a href={`#${label.toLowerCase()}`} onClick={(e) => { e.preventDefault(); handleNavClick(label); }}>{label}</a>
                        </li>
                    ))}
                </ul>

                <div className="flex-center gap-3">
                    <button>
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button>
                        <img src="/cart.svg" alt="Cart" />
                    </button>
                </div>
            </nav>
        </header>
    )
}
export default NavBar
