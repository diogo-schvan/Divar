import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";
import NavBar from "../../components/home/HeaderVendedor";
import Style from "../../style/carrinho_compras/CartPage.module.css";

export default function CarrinhoDeCompras() {
  // Extracting cart state from redux store
  const cart = useSelector((state) => state.cart);

  // Reference to the dispatch function from redux store
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  return (
    <>
      <NavBar />
      <div className={Style.container}>
        {cart.length === 0 ? (
          <h1>Sua lista está vazia!</h1>
        ) : (
          <>
            <div className={Style.header}>
              <div>Foto</div>
              <div>Produto</div>
              <div>Preço</div>
              <div>Quantidade</div>
              <div>Ações</div>
              <div>Preço Total</div>
            </div>
            {cart.map((item) => (
              <div className={Style.body}>
                <div className={Style.image}>
                  <Image src={item.image} height="90" width="65" />
                </div>
                <p>{item.product}</p>
                <p>$ {item.price}</p>
                <p>{item.quantity}</p>
                <div className={Style.buttons}>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>
                    +
                  </button>
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>
                    -
                  </button>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    x
                  </button>
                </div>
                <p>$ {(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
            <h2>Grand Total: $ {getTotalPrice().toFixed(2)}</h2>
          </>
        )}
      </div>
    </>
  );
}
