import { useState, useEffect } from "react";
import Link from "next/link";
import Style from "../../../style/gerenciamento/SistemaUsuarios.module.css";
import { getUsuarios } from "../../../pages/api/usuarios";

export default function SistemaUsuarios() {
  const [usuarios, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsuarios()
      .then((data) => {
        setUsuario(data.usuarios);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className={Style.container_sistema_usuarios}>
      <table className={Style.table}>
        <thead className={Style.thead}>
          <tr>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Grupo</th>
            <th>Cidade</th>
            <th>Limite</th>
          </tr>
        </thead>
        <tbody className={Style.tbody}>
          {usuarios?.map((usuario) => (
            <tr>
              <td>
                <Link href={`/gerenciamento/sistema/usuarios/${usuario.id}`}>
                  {usuario.nome_completo}
                </Link>
              </td>
              <td>{usuario.cpf}</td>
              <td>{usuario.data_nascimento}</td>
              <td>{usuario.endereco}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.grupo_nome}</td>
              <td>{usuario.cidade_nome}</td>
              <td>{usuario.limite_produtos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
