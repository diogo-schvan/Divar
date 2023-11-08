import Style from '../../../../../style/gerenciamento/editarProdutoPopup/EditarProdutoPopup.module.css';
import React, { useEffect, useState } from 'react';
import { buscaTipoProdutos, atualizaProduto, salvarImagem } from "../../../../../pages/api/cadastroProdutos/api";

export default function EditarProdutoPopup({ produto, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        codigo_de_barras: produto.codigo_de_barras,
        valor: produto.valor,
        is_ativo: true,
        diretorio_foto: produto.diretorio_foto,
        id_tipo_produto: produto.id_tipo_produto,
        quantidade_em_estoque: produto.quantidade_em_estoque,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageClick = (e) => {
        const fileInput = document.getElementById("imagem_produto");
        fileInput.click();
        fileInput.onchange = () => {
            if (fileInput.files.length === 0) {
                return;
            }
            const reader = new FileReader();
            setFormData({ ...formData, [fileInput.name]: fileInput.files[0] });

            reader.readAsDataURL(fileInput.files[0]);

            reader.onload = () => {
                e.target.src = reader.result;
            };
        }
    };

    const handleSave = () => {

        const formDataCopy = { ...formData };
        if (/\s/.test(formDataCopy.diretorio_foto.name)) {
            const name_foto = formDataCopy.diretorio_foto.name.replace(/\s/g, '_');
            formDataCopy.diretorio_foto = "/produtos/" + name_foto;
        }
        atualizaProduto(formDataCopy);

        if (formData.diretorio_foto instanceof File) {
            const newFormData = new FormData();
            newFormData.append("imagem_produto", formData.diretorio_foto);
            salvarImagem(newFormData);
        }
        onSave(formDataCopy);
    };

    const [tipoOpcoes, setTipoOpcoes] = useState([]);

    useEffect(() => {
        // Chama a função buscarProdutos para buscar os produtos da API
        buscaTipoProdutos()
            .then((data) => {
                // Atualizar os dados com a resposta da API
                setTipoOpcoes(data);
            })
            .catch((error) => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

    return (
        <div className={Style.popupContainer}>
            <div className={Style.popupContent}>
                <h2>Editar Produto</h2>
                <form >
                    <div>
                        <span>Nome</span>
                        <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} id="" className={Style.inputField} />
                    </div>
                    <div>
                        <span>Descricao</span>
                        <input type="text" name="descricao" value={formData.descricao} onChange={handleInputChange} id="" className={Style.inputField} />
                    </div>
                    <div>
                        <span>codigo_de_barras</span>
                        <input type="text" name="codigo_de_barras" value={formData.codigo_de_barras} onChange={handleInputChange} id="" className={Style.inputField} />
                    </div>
                    <div>
                        <span>Tipo</span>
                        <select
                            name="id_tipo_produto"
                            value={formData.id_tipo_produto || ""} // Certifique-se de que seja uma string vazia quando o valor for nulo
                            onChange={handleInputChange}
                            className={Style.inputField}
                        >
                            <option value="">Select</option>
                            {tipoOpcoes.map((opcao) => (
                                <option key={opcao.id} value={opcao.id}>
                                    {opcao.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <span>Valor</span>
                        <input type="text" name="valor" value={formData.valor} onChange={handleInputChange} id="" className={Style.inputField} />
                    </div>
                    <div>
                        <span>Quantidade em estoque</span>
                        <input type="text" name="quantidade_em_estoque" value={formData.quantidade_em_estoque} onChange={handleInputChange} id="" className={Style.inputField} />
                    </div>
                    <div>
                        <span>Ativo</span>
                        <select name="is_ativo" id="" value={formData.ativo_inativo} onChange={handleInputChange} className={Style.inputField}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>
                    <div>
                        <img src={`http://localhost:8000/api/imagem${formData.diretorio_foto}`} onClick={handleImageClick} alt="Imagem Redonda" className={Style.imagem_redonda} />

                        <input name="diretorio_foto" type="file" id="imagem_produto" style={{ display: "none" }} />
                    </div>
                </form>
                <button className={Style.saveButton} onClick={handleSave}>Salvar</button>
                <button className={Style.cancelButton} onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    );
}
