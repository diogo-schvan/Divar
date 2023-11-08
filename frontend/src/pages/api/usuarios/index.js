export async function getUsuarios() {
   try {
     const response = await fetch("http://localhost:8000/api/users");

     if (response.ok) {
       const data = await response.json();
       return data;
     }
   } catch (error) {
     throw error;
   }
}

export async function getUsuarioById(formData) {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${formData.id}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function atualizaUsuario(formData, id) {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "PUT", // Altere para o método que seu backend espera
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
