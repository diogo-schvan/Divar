import { useState, useEffect } from "react";
import { getGrupos, deletaGrupo } from "../../../../pages/api/grupos";
import { useRouter } from "next/router";
import Style from "../../../../style/gerenciamento/tabelas/TabelaGrupos.module.css";

export default function TabelaGrupos() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const response = await deletaGrupo({ id });
      console.log(response);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGrupos()
      .then((data) => {
        setGrupos(data.grupos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <table className={Style.table}>
      <thead>
        <tr>
          <th className={Style.th}>Nome do Grupo</th>
          <th className={Style.th}>Cidades</th>
          <th className={Style.th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {grupos?.map((grupo) => (
          <tr key={grupo.id} className={Style.tr}>
            <td className={Style.td1}>{grupo.nome}</td>
            <td className={Style.td2}>
              <ul>
                {grupo.cidades.map((cidade) => (
                  <li key={cidade.id}>{cidade.nome}</li>
                ))}
              </ul>
            </td>
            <td>
              <button className={Style.button} onClick={(e) => handleDelete(e, grupo.id)}>
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
