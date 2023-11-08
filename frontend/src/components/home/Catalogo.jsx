import React, { useState, useEffect } from 'react';
import Style from "../../style/home_vendedor/Catalogo.module.css";
import { getProdutos } from '../../pages/api/products/'; // Substitua com o caminho correto

export default function Catalogo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtos = await getProdutos();
        setProducts(produtos);
      } catch (error) {
        // Trate o erro conforme necessário
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className={Style.catalogo}>
    {products.map((product) => (
      <div key={product.id} className={Style.produto}>
        <img src={`http://localhost:8000/api/imagem${product.diretorio_foto}`} alt={product.nome} />
        <h3>{product.nome}</h3>
        <p>R$ {product.valor}</p>
      </div>
    ))}
  </div>
  );
}