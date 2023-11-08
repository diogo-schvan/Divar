import MenuLateral from "../../../components/gerenciamento/MenuLateral";
import NavBar from "../../../components/gerenciamento/NavBar";
import CadastroGrupos from "../../../components/gerenciamento/cadastro/CadastroGrupo";

export default function GerenciamentoCadastroGrupos() {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <MenuLateral />
        <CadastroGrupos />
      </div>
    </>
  );
}
