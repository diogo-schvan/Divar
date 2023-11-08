import { useEffect, useState } from 'react';
import Style from "../../../style/gerenciamento/CadastroProduto.module.css";
import TabelaProduto from "../../../components/gerenciamento/cadastro/tabelas/TabelaProduto";
import { cadastrarProduto, buscaTipoProdutos, salvarImagem } from "../../../pages/api/cadastroProdutos/api";

export default function CadastroProduto() {
  const [tipoOpcoes, setTipoOpcoes] = useState([]);
  const [formData, setFormData] = useState({
    nome: "Diogo",
    descricao: "Diogo",
    codigo_de_barras: "12345",
    valor: 19.99,
    is_ativo: true,
    diretorio_foto: "/media/gerenciamento/imagens/logo_divar.png",
    id_tipo_produto: null,
    quantidade_em_estoque: 100,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = (e) => {
    const fileInput = document.getElementById("imagem_produto");
    fileInput.click();
    fileInput.onchange = () => {
      if (fileInput.files.length === 0) return;
      const reader = new FileReader();
      setFormData({ ...formData, [fileInput.name]: fileInput.files[0] });
      reader.readAsDataURL(fileInput.files[0]);
      reader.onload = () => { e.target.src = reader.result };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const copiaFormData = { ...formData };
    if (/\s/.test(copiaFormData.diretorio_foto.name)) {
      copiaFormData.diretorio_foto = "/produtos/" + copiaFormData.diretorio_foto.name.replace(/\s/g, '_');
    }
    cadastrarProduto(copiaFormData).then((data) => { }).catch((error) => { console.error("Erro ao enviar os dados:", error) });
    if (formData.diretorio_foto instanceof File) {
      const newFormData = new FormData();
      newFormData.append("imagem_produto", formData.diretorio_foto);
      salvarImagem(newFormData);
    }
  };

  useEffect(() => {
    buscaTipoProdutos().then((data) => { setTipoOpcoes(data) }).catch((error) => { console.error('Erro ao buscar os dados:', error) });
  }, []);

  return (
    <div className={Style.container_cadastro_produto}>
      <form onSubmit={handleSubmit} className={Style.parent}>
        <div className={Style.div1}>
          <span className={Style.span}>Nome</span>
          <input className={Style.input_form} type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
        </div>
        <div className={Style.div2}>
          <span className={Style.span}>Descricao</span>
          <input className={Style.input_form} type="text" name="descricao" value={formData.descricao} onChange={handleInputChange} />
        </div>
        <div className={Style.div3}>
          <span className={Style.span}>Codigo de Barras</span>
          <input className={Style.input_form} type="text" name="codigo_de_barras" value={formData.codigo_de_barras} onChange={handleInputChange} />
        </div>
        <div className={Style.div4}>
          <span className={Style.span}>Tipo</span>
          <select className={Style.input_form} name="id_tipo_produto" value={formData.id_tipo_produto || ""} onChange={handleInputChange}>
            <option value="">Select</option>
            {tipoOpcoes.map((opcao) => (<option key={opcao.id} value={opcao.id}>{opcao.nome}</option>))}
          </select>
        </div>
        <div className={Style.div5}>
          <span className={Style.span}>Valor</span>
          <input className={Style.input_form} type="text" name="valor" value={formData.valor} onChange={handleInputChange} />
        </div>
        <div className={Style.div6}>
          <span className={Style.span}>Quantidade em estoque</span>
          <input className={Style.input_form} type="text" name="quantidade_em_estoque" value={formData.quantidade_em_estoque} onChange={handleInputChange} />
        </div>
        <div className={Style.div7}>
          <span className={Style.span}>Ativo</span>
          <select className={Style.input_form} name="is_ativo" value={formData.ativo_inativo} onChange={handleInputChange}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <div className={Style.div8}>
          <input type="submit" className="salvar_button" value="Salvar" />
        </div>
        <div className={Style.div9}>
          <img src={formData.diretorio_foto} onClick={handleImageClick} alt="Imagem Redonda" className={Style.imagem_redonda} />
          <input name="diretorio_foto" type="file" id="imagem_produto" style={{ display: "none" }} />
        </div>
      </form>
      <TabelaProduto />
    </div>
  )
}