import { useState, useEffect } from "react";
import Link from "next/link";
import Style from "../../../style/gerenciamento/SistemaEdicaoUsuario.module.css";
import { getUsuarioById, atualizaUsuario } from "../../../pages/api/usuarios";
import { useRouter } from "next/router";

export default function EdicaoUsuarios({ id }) {
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      id_grupo: usuario.grupo_id,
      limite_produtos: formData.get("limite"),
    };

    try {
      const response = await atualizaUsuario(data, id);
      console.log(response);
      router.push("/gerenciamento/sistema/usuarios");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsuarioById({ id })
      .then((data) => {
        setUsuario(data.usuario);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className={Style.container_edicao_usuario}>
      <form onSubmit={handleSubmit} className={Style.form_edicao_usuario}>
        <div className={Style.form_first_row}>
          <label>Nome</label>
          <input disabled defaultValue={usuario.nome_completo} />
        </div>
        <div className={Style.form_first_row}>
          <label>Cpf</label>
          <input disabled defaultValue={usuario.cpf} />
        </div>
        <div className={Style.form_first_row}>
          <label>Data de Nascimento</label>
          <input disabled defaultValue={usuario.data_nascimento} />
        </div>
        <div className={Style.form_first_row}>
          <label>Endereço</label>
          <input disabled defaultValue={usuario.endereco} />
        </div>
        <div className={Style.form_first_row}>
          <label>Telefone</label>
          <input disabled defaultValue={usuario.telefone} />
        </div>
        <div className={Style.form_first_row}>
          <label>Grupo</label>
          <input disabled defaultValue={usuario.grupo_nome} />
        </div>
        <div className={Style.form_first_row}>
          <label>Cidade</label>
          <input disabled defaultValue={usuario.cidade_nome} />
        </div>
        <div className={Style.form_first_row}>
          <label>Limite</label>
          <input
            id="limite"
            name="limite"
            defaultValue={usuario.limite_produtos}
          />
        </div>
        <div className={Style.buttons}>
          <input type="submit" className={Style.submit_button} value="Salvar" />
          <Link href="/gerenciamento/sistema/usuarios">
            <button className={Style.cancel_button}>Voltar</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
