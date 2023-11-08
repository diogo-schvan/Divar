import React from "react";
import Style from "../../../../../style/gerenciamento/paginacao/Paginacao.module.css";

export default function SeletorPaginacao({ setItensPorPagina }) {
    return (
        <div className={Style.seletorContainer}>
            <select className={Style.input_form_select} onChange={(e) => setItensPorPagina(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value="Todos">Todos</option>
            </select>
        </div>
    )
}