export async function cadastrarProduto(formData) {
    try {
        const response = await fetch("http://localhost:8000/api/registros", {
            method: "POST", // Altere para o método que seu backend espera
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar o produto");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function salvarImagem(formData) {
    try {
        const response = await fetch("http://localhost:8000/api/registros/salvarImagem", {
            method: "POST", // Altere para o método que seu backend espera
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar o produto");
        }

    } catch (error) {
        throw error;
    }
}

export async function buscarProdutos() {
    try {
        const response = await fetch("http://localhost:8000/api/registros");

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error; // Rejeita a Promise para que o erro seja tratado onde a função for chamada.
    }
}

export function RemoverItem(itemId) {
    return fetch(`http://localhost:8000/api/registros/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na remoção do item');
            }
        })
        .catch((error) => {
            console.error('Erro ao enviar a solicitação DELETE:', error);
        });
}

export async function buscaTipoProdutos() {
    try {
        const response = await fetch("http://localhost:8000/api/registros/tipo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro na remoção do item");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao enviar a solicitação DELETE:", error);
        throw error; // Propaga o erro para quem chamou a função
    }
}

export async function atualizaProduto(formData) {
    try {
        const response = await fetch("http://localhost:8000/api/registros", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });


        if (!response.ok) {
            throw new Error("Erro na remoção do item");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao enviar a solicitação DELETE:", error);
        throw error; // Propaga o erro para quem chamou a função
    }
}

