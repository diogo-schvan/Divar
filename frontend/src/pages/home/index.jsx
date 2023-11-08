import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import { getProdutos } from "../../pages/api/products/index";
import NavBar from "../../components/home/NavBar";
import Catalogo from "../../components/home/Catalogo";
import HeaderVendedor from "../../components/home/HeaderVendedor";
import NavBarVendedor from "../../components/gerenciamento/NavBar";

export default function home({ products }) {
  useEffect(() => {
    const cookies = parseCookies();
    const nomeCookie = cookies.user; // Mudei o nome aqui
    console.log("Cookie: ", nomeCookie);
  }, []);

  const cookies = parseCookies();
  const nomeCookie = cookies.user; // Mudei o nome aqui

  if (nomeCookie === 'Vendedor') {
    return (
      <>
        <HeaderVendedor />
        <NavBar />
        <Catalogo products={products} />
      </>
    );
  } else {
    return (
      <>
        <NavBarVendedor />
        <NavBar />
        <Catalogo products={products} />
      </>
    )
  }
}

export async function getStaticProps() {
  const products = await getProdutos();
  return { props: { products } };
}
