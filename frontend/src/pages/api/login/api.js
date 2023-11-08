import { handleAuthenticationResponse } from "../../../components/login/auth"

export async function validaLogin(formData) {
    try {
        const response = await fetch("http://localhost:8000/api/registros/validaLogin", {
            method: "POST", // Altere para o método que seu backend espera
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.message === 'Autenticado') {
                handleAuthenticationResponse(data);
            }
            return data.message;
        }
    } catch (error) {
        throw error;
    }
}