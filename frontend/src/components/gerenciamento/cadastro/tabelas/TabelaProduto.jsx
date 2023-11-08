import React, { useEffect, useState } from 'react';
import Style from '../../../../style/gerenciamento/tabelas/TabelaProdutos.module.css';
import Paginacao from './Paginacao.jsx/Paginacao';
import SeletorPaginacao from './Paginacao.jsx/SeletorPaginacao';
import EditarProdutoPopup from '../tabelas/EditaProduto/EditarProdutoPopup';
import { buscarProdutos, RemoverItem } from "../../../../pages/api/cadastroProdutos/api";
import { startTransition } from 'react';

export default function TabelaProdutos() {
    const [dados, setDados] = useState([]);
    const [itensPorPagina, setItensPorPagina] = useState(5);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [itensAtuaisPorPagina, setItensAtuaisPorPagina] = useState([]);
    const [itensIniciais, setStartIndex] = useState(0);
    const [itensFinais, setEndIndex] = useState(0);
    const [editItem, setEditItem] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [busca, setBusca] = useState('');

    const itensAtuaisFiltrados = itensAtuaisPorPagina.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));

    const pages = Math.ceil(dados.length / itensPorPagina);


    const handleEditItem = (item) => {
        setEditItem(item);
        setPopupVisible(true);
    };

    const handleSaveEdit = (editedItem) => {
        const novosItens = dados.map((item) => {
            if (item.id === editedItem.id) {
                return {
                    ...item,
                    nome: editedItem.nome,
                    id_tipo_produto: editedItem.id_tipo_produto,
                    descricao: editedItem.descricao,
                    valor: editedItem.valor,
                    cod_barras: editedItem.cod_barras,
                    quantidade_em_estoque: editedItem.quantidade_em_estoque,
                    ativo: editedItem.ativo,
                    diretorio_foto: editedItem.diretorio_foto,
                };
            }
            return item;
        });
        setPopupVisible(false);
        setDados(novosItens);
    };

    const handleRemoverItem = (itemId) => {
        RemoverItem(itemId)
            .then((data) => {
                console.log('Item removido com sucesso:', data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erro ao remover o item:', error);
            });
    };

    useEffect(() => {
        setPaginaAtual(0);
    }, [itensPorPagina]);

    useEffect(() => {
        buscarProdutos()
            .then((data) => {
                setDados(data);
            })
            .catch((error) => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

    useEffect(() => {
        const startIndex = paginaAtual * itensPorPagina;
        const endIndex = startIndex + itensPorPagina;
        const itensAtuais = dados.slice(startIndex, endIndex);
        //FIX ME
        //******************************************************************************************* */
        const itensIniciais = paginaAtual * itensPorPagina;
        const itensFinais = Math.min(dados.length, (itensIniciais + itensPorPagina));

        setStartIndex(itensIniciais);
        setEndIndex(itensFinais);

        //******************************************************************************************* */      
        setItensAtuaisPorPagina(itensAtuais);
    }, [dados, paginaAtual, itensPorPagina]);

    return (
        <>
            <div className={Style.container_pesquisa_seletor}>
                <div >
                    <input className={Style.pesquisa} type="text" placeholder='Pesquisar' value={busca} onChange={(e) => setBusca(e.target.value)} />
                </div>

                <div >
                    <SeletorPaginacao setItensPorPagina={setItensPorPagina} />
                </div>
            </div>
            <div  className={Style.tabelaContainer}>
                <table className={Style.tabela}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Cod_barras</th>
                            <th>Quantidade</th>
                            <th>Ativo</th>
                            <th colSpan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensAtuaisFiltrados.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nome}</td>
                                <td>{item.id_tipo_produto}</td>
                                <td>{item.descricao}</td>
                                <td>{item.valor}</td>
                                <td>{item.cod_barras}</td>
                                <td>{item.quantidade_em_estoque}</td>
                                <td>{item.ativo ? 'Sim' : 'Não'}</td>
                                <td>
                                    <button className={Style.remover} onClick={() => handleRemoverItem(item.id)}>Remover</button>
                                </td>
                                <td>
                                    <button className={Style.editar} onClick={() => handleEditItem(item)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="9">
                                <div className={Style.container_pesquisa_seletor}>
                                    <div>
                                        mostrando {itensIniciais} de {itensFinais} resultados
                                    </div>
                                    <div className={Style.paginacaoContainer}>
                                        <Paginacao pages={pages} paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {popupVisible && (
                <EditarProdutoPopup
                    produto={editItem}
                    onSave={handleSaveEdit}
                    onCancel={() => {
                        setEditItem(null);
                        setPopupVisible(false);
                    }}
                />
            )}
        </>
    );
};
