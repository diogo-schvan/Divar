import Style from "../../style/gerenciamento/NavBar.module.css"

export default function NavBar() {

    return (
        <div className={Style.teste}>
            <div className={Style.logoContainer}>
                <a href="/home">
                    <img className={Style.logo} src="/media/gerenciamento/imagens/logo_divar.png" alt="Logo " />
                </a>
            </div>
            <div className={Style.itensContainer}>
                <a href="http://localhost:3000/gerenciamento/cadastro/produto"><img className={Style.itens} src="/media/gerenciamento/svg/configuracao.svg" alt="Descrição do SVG" /></a>
                <img className={Style.itens} src="/media/gerenciamento/svg/notificacao.svg" alt="Notificacao" />
                <img className={Style.itens} src="/media/gerenciamento/svg/perfil.svg" alt="Perfil" />
            </div>
        </div>
    )
}
