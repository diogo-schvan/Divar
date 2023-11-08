import Style from "../../style/cadastro/Autoriza.module.css";
import Link from "next/link";
import Style2 from "../../style/gerenciamento/SistemaUsuarios.module.css";
import { getUsuarios } from "../../pages/api/usuarios";
import { useState, useEffect } from "react";

export default function autoriza() {

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
        <body className={Style.page}>
            <form className={Style.formLogin}>
                <div className={Style.voltar}>
                    <a href="/login">
                        <img src="../../media/gerenciamento/imagens/voltar.jpg" alt="Imagem" />
                    </a>
                </div>
                <div className={Style.center}><img src="../../media\gerenciamento/imagens\logo_divar.png" alt="Imagem" /></div>
                <div className={Style.container}>
                    <div className={Style.table}>
                        <table className={Style2.table}>
                            <thead className={Style2.thead}>
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
                            <tbody className={Style2.tbody}>
                                {usuarios?.map((usuario) => (
                                    <tr>
                                        <td>
                                            <Link href={`/cadastro/autoriza/${usuario.id}`}>
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
                </div>
            </form>
        </body>
    );
};
