import NavBar from "../../../components/gerenciamento/NavBar";
import MenuLateral from "../../../components/gerenciamento/MenuLateral";
import AutorizaUsuarios from "../../../components/autoriza/AutorizaUsuarios";

export default function autoriza({ id }) {
    return (
        <>
            <NavBar />
            <div style={{ display: "flex" }}>
                <MenuLateral />
                <AutorizaUsuarios id={id} />
            </div>
        </>
    );
};

export async function getServerSideProps(ctx) {
    const id = ctx.query.id;
    return { props: { id } };
}