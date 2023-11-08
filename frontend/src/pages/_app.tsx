import "../style/global.css";
import store from "../redux/store";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { isAuthenticated } from "../components/login/auth";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const isUserAuthenticated = isAuthenticated();

    if (isUserAuthenticated) {
      if (router.pathname === "/login" || router.pathname === "/cadastro") {
        router.push("/home");
      }
    } else {
      if (router.pathname !== "/login" && router.pathname !== "/cadastro") {
        router.push("/login");
      }
    }
  }, [router.pathname]);

  // Renderize o componente somente se o usuário estiver autenticado ou na página de login

  return isClient && (isAuthenticated() || router.pathname === "/login" || router.pathname === "/cadastro") ? (
    <Provider store={store}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <div>
        <Component {...pageProps} />
      </div>
    </Provider>
  ) : null;
}

export default MyApp;
