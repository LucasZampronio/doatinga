// src/services/catalogApi.js
export async function fetchCatalogItems() {
  const response = await fetch('http://localhost:3333/api/institutions');
  if (!response.ok) throw new Error('Erro ao carregar catálogo');
  
  const json = await response.json();
  return json.data;
}
