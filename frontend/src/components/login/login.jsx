import React, { useState } from "react";
import Style from "../../style/login/Login.module.css";
import { validaLogin } from "../../pages/api/login/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputMask from "react-input-mask";

export default function Login() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      cpf: formData.get("cpf"),
      senha: formData.get("senha"),
    };

    try {
      const response = await validaLogin(data);

      if (response === "Autenticado") {
        window.location.href = "/home";
      } else {
        setError("CPF ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setError("CPF ou senha incorretos.");
    }
  };

  return (
    <div className={Style.page}>
      <form onSubmit={handleSubmit} className={Style.formLogin}>
        <div className={Style.flex_box}>
          <div className={Style.center}>
            <img src="../../media/gerenciamento/imagens/logo_divar.png" alt="Imagem" />
          </div>
          <div className={Style.field}>
            <label htmlFor="cpf">CPF</label>
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
            <label htmlFor="senha">Senha</label>
            <div className={Style.passwordInput}>
              <input type={showPassword ? "text" : "password"} id="senha" name="senha" maxLength="14" required />
              <div className={Style.passwordIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className={Style.btn}>
            <button className={Style.button} type="submit">Entrar</button>
          </div>
          <div className={Style.registerLink}>
            Não tem uma conta? <a href="/cadastro">Registre-se</a>
          </div>
        </div>
        {error && <div className={Style.error}>{error}</div>}
      </form>
    </div>
  );
}
