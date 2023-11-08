import Style from "../../style/home_vendedor/NavBar.module.css"

export default function NavBar() {
    return (
    <nav className={Style.nav}>
        <a href="#">Brincos</a>
        <a href="#">Pulseiras</a>
        <a href="#">Anéis</a>
        <a href="#">Correntes</a>
    </nav>
    )
}