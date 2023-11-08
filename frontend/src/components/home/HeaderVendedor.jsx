import Link from "next/link";
import { useSelector } from "react-redux";
import Style from "../../style/gerenciamento/NavBar.module.css";

export default function HeaderVendedor() {
  // Selecting cart from global state
  const cart = useSelector((state) => state.cart);

  // Getting the count of items
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  return (
    <div className={Style.teste}>
            <div className={Style.logoContainer}>
                <a href="/home">
                    <img className={Style.logo} src="/media/gerenciamento/imagens/logo_divar.png" alt="Logo " />
                </a>
            </div>
            <div className={Style.itensContainer}>
                <Link href="/carrinho_compras">
                  <img className={Style.itens} src="/media/gerenciamento/svg/carrinho.svg" alt="Carrinho" />
                </Link>
                <p className={Style.itemCount}>{getItemsCount()}</p>
                <img className={Style.itens} src="/media/gerenciamento/svg/perfil.svg" alt="Perfil" />
            </div>
        </div>
  );
}
