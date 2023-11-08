import NavBar from "../../../../components/gerenciamento/NavBar";
import MenuLateral from "../../../../components/gerenciamento/MenuLateral";
import EdicaoUsuarios from "../../../../components/sistema/usuario/EdicaoUsuarios";

export default function GerenciamentoSistemaUsuarios({ id }) {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <MenuLateral />
        <EdicaoUsuarios id={id} />
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const id = ctx.query.id;
  return { props: { id } };
}
