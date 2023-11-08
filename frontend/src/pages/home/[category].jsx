import { getProductsByCategory } from '../api/products/[category]';
import Header from "../../components/home/HeaderVendedor";
import NavBar from "../../components/home/NavBar";
import Catalogo from "../../components/home/Catalogo";

export default function home({ products }) {
  return (
    <>
      <Header />
      <NavBar />
      <Catalogo products={products} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const category = ctx.query.category;
  const products = await getProductsByCategory(category);
  return { props: { products } };
}
