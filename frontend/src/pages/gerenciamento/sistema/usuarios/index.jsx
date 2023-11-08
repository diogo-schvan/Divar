import NavBar from "../../../../components/gerenciamento/NavBar";
import MenuLateral from "../../../../components/gerenciamento/MenuLateral";
import SistemaUsuarios from "../../../../components/sistema/usuario/SistemaUsuarios";

export default function GerenciamentoSistemaUsuarios() {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <MenuLateral />
        <SistemaUsuarios />
      </div>
    </>
  );
}