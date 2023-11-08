import React, { useState } from 'react';
import Style from "../../style/cadastro/Cadastro.module.css";
import InputMask from 'react-input-mask';

export default function CadastroForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    cidade: '',
    endereco: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const data = {nome_completo: formData.get('nome'),
                  cpf : formData.get('cpf'),
                  data_nascimento : formData.get('dataNascimento'),
                  tipo_usuario: 'vendedor',
                  endereco: formData.get('endereco'),
                  telefone: formData.get('telefone'),
                  senha: formData.get('senha')}

   /*  console.log(data); */

    try {
      const response = await fetch('http://localhost:8000/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Certifique-se de ajustar o tipo de conteúdo conforme necessário
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Lidar com a resposta de sucesso, por exemplo, redirecionar o usuário
      } else {
        // Lidar com erros, como exibir uma mensagem de erro para o usuário
        console.error('Erro ao enviar os dados para o servidor');
      }
    } catch (error) {
      // Lidar com erros de rede, como exibir uma mensagem de erro para o usuário
      console.error('Erro de rede ao enviar os dados para o servidor', error);
    } 
  };

  return (
    <div className={Style.page}>
      <form onSubmit={handleSubmit} className={Style.formLogin}>
        <div className={Style.voltar}>
          <a href="/login">
            <img src="../../media/gerenciamento/imagens/voltar.jpg" alt="Imagem" />
          </a>
        </div>
        <div className={Style.center}><img src="../../media/gerenciamento/imagens/logo_divar.png" alt="Imagem" /></div>
        <div className={Style.container}>
          <div className={Style.field}>
            <label htmlFor="nome">Nome Completo:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className={Style.field}>
            <label htmlFor="cpf">CPF:</label>
            <InputMask
              mask="999.999.999-99"
              maskChar=""
              type="text"
              id="cpf"
              name="cpf"
              required
            />
          </div>
          <div className={Style.field}>
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
          </div>
          <div className={Style.field}>
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
          </div>
          <div className={Style.field}>
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
          </div>
          <div className={Style.field}>
            <label htmlFor="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" value={formData.telefone} maxLength="11" onChange={handleChange} required />
          </div>
          <div className={Style.field}>
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
          </div>
          <div className={Style.field}>
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />
          </div>
        </div>
        <div className={Style.btn}>
          <button className={Style.button} type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
