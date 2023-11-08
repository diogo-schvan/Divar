import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Substitua pelo URL do seu backend

export const getProdutos = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/registros`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
    throw error;
  }
};
