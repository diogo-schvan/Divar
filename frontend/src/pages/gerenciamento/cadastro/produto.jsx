
import NavBar from "../../../components/gerenciamento/NavBar";
import MenuLateral from "../../../components/gerenciamento/MenuLateral";
import CadastroProduto from "../../../components/gerenciamento/cadastro/CadastroProduto"

export default function GerenciamentoCadastroProdutos() {

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex' }}>
        <MenuLateral />
        <CadastroProduto />
      </div>
    </>
  )
}
