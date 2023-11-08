
import Style from "../../style/gerenciamento/MenuLateral.module.css"

export default function MenuLateral() {

  return (
    <div className={Style.container_menu_lateral}>
      <div>
        <div>
          <p className={Style.subtitulos} >Cadastros</p>
        </div>
        <a href="/gerenciamento/cadastro/produto"><p className={Style.texto}>Cadastro Produto</p></a>
        <a href="/gerenciamento/cadastro/grupo"><p className={Style.texto}>Cadastro Grupo</p></a>
      </div>
      <div>
        <div>
          <p className={Style.subtitulos} >Relatorios</p>
        </div>
        <a href=""><p className={Style.texto}>Estoque</p></a>
        <a href=""><p className={Style.texto}>Vendas</p></a>
      </div>
      <div>
        <div>
          <p className={Style.subtitulos} >Sistema</p>
        </div>
        <a href="/gerenciamento/sistema/usuarios"><p className={Style.texto}>Usuarios</p></a>
        <a href=""><p className={Style.texto}>Comissao</p></a>
        <a href="/cadastro/autoriza"><p className={Style.texto}>Autoriza Usuario</p></a>
        <a href=""><p className={Style.texto}>Pedidos</p></a>
      </div>
    </div>
  )
}
