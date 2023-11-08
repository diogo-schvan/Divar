export async function getGrupos() {
  try {
    const response = await fetch("http://localhost:8000/api/grupos");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function getCidades() {
  try {
    const response = await fetch("http://localhost:8000/api/cidades");

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function criarGrupo(formData) {
  try {
    const response = await fetch("http://localhost:8000/api/grupos", {
      method: "POST", // Altere para o método que seu backend espera
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return data.message;
    }
  } catch (error) {
    throw error;
  }
}

export async function deletaGrupo(formData) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/grupos/${formData.id}`,
      {
        method: "DELETE", // Altere para o método que seu backend espera
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.message;
    }
  } catch (error) {
    throw error;
  }
}
