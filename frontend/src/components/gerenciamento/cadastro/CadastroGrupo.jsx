import { useState, useEffect } from "react";
import Select from "react-select";
import { criarGrupo } from "../../../pages/api/grupos";
import Style from "../../../style/gerenciamento/CadastroGrupo.module.css";
import TabelaGrupos from "./tabelas/TabelaGrupos";
import { getCidades } from "../../../pages/api/grupos";
import { useRouter } from "next/router";

export default function CadastroGrupos() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [cidades, setCidades] = useState([]);

  const router = useRouter();

  var handleChange = (newselectedOption) => {
    const aux = newselectedOption.map((x) => x.value);
    setSelectedOption(aux);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      nome: formData.get("nome"),
      cidades: selectedOption,
    };

    try {
      const response = await criarGrupo(data);
      console.log(response);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCidades()
      .then((data) => {
        const aux = data.cidades.map((x) => ({ value: x.id, label: x.nome }));
        setCidades(aux);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  if (cidades?.length == 0) return <div>loading...</div>;

  return (
    <div className={Style.container_cadastro_grupo}>
      <form onSubmit={handleSubmit} className={Style.form_cadastro_produto}>
      <div className={Style.form_first_row}>
          <span>Nome do Grupo</span>
          <input type="text" name="nome" id="nome" className={Style.input_field} />
        </div>
        <div className={Style.form_first_row}>
          <span>Cidades</span>
          <Select isMulti onChange={handleChange} options={cidades} />
        </div>
        <div>
        <input type="submit" className={Style.submit_button} value="Salvar" />
        </div>
      </form>

      <TabelaGrupos />
    </div>
  );
}
