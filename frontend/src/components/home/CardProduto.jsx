import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import Style from "../../style/home_vendedor/ProductCard.module.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className={Style.produto}>
      <Image src={product.image} height={165} width={165} />
      <div className={Style.nome}>{product.title}</div>
      <p>$ {product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className={Style.button}
      >
        Adicionar
      </button>
    </div>
  );
}
