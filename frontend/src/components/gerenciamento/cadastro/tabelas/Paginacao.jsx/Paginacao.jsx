import React from "react";
import Style from "../../../../../style/gerenciamento/paginacao/Paginacao.module.css";

export default function Paginacao({ pages, paginaAtual, setPaginaAtual }) {
    const maxItems = 5; // Define o número máximo de itens de paginação a serem exibidos

    const renderizarBotoes = () => {
        const botoes = [];
        const inicio = Math.max(0, paginaAtual - Math.floor(maxItems / 2));
        const fim = Math.min(pages, inicio + maxItems);

        for (let i = inicio; i < fim; i++) {
            botoes.push(
                <button
                    key={i}
                    onClick={() => setPaginaAtual(i)}
                >
                    {i + 1}
                </button>
            );
        }

        return botoes;
    };

    return (
        <div className={Style.paginacaoContainer}>
            <button
                onClick={() => setPaginaAtual(paginaAtual - 1)}
                disabled={paginaAtual === 0}
            >
                Previous
            </button>
            {renderizarBotoes()}
            <button
                onClick={() => setPaginaAtual(paginaAtual + 1)}
                disabled={paginaAtual === pages - 1}
            >
                Next
            </button>
        </div>
    );
}
