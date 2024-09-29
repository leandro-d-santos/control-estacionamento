const vagasLocalStorageKey = 'vagas';
const vagaParaEditarLocalStorageKey = 'vaga';

/**
 * 
 * @returns {{id: number, proprietario: string, numeroApartamento: number, blocoApartamento: string, placaVeiculo: string, modeloVeiculo: string, corVeiculo: string, numeroVaga: number }[]} vagas
 */
function getVagas() {
  const localstorageValue = localStorage.getItem(vagasLocalStorageKey) || '';
  if (!localstorageValue) return [];
  return JSON.parse(localstorageValue);
}

/**
 * 
 * @param {{id: number, proprietario: string, numeroApartamento: number, blocoApartamento: string, placaVeiculo: string, modeloVeiculo: string, corVeiculo: string, numeroVaga: number }[]} vagas 
 */
function setVagas(vagas) {
  localStorage.setItem(vagasLocalStorageKey, JSON.stringify(vagas))
}

/**
 * 
 * @returns {{id: number, proprietario: string, numeroApartamento: number, blocoApartamento: string, placaVeiculo: string, modeloVeiculo: string, corVeiculo: string, numeroVaga: number}} Retorna o objeto ou undefined
 */
function getVagaParaEditar() {
  const localstorageValue = localStorage.getItem(vagaParaEditarLocalStorageKey) || '';
  if (!localstorageValue) return undefined;
  return JSON.parse(localstorageValue);
}

/**
 * 
 * @param {{id: number, proprietario: string, numeroApartamento: number, blocoApartamento: string, placaVeiculo: string, modeloVeiculo: string, corVeiculo: string, numeroVaga: number}} vaga
 */
function setVagaParaEditar(vaga) {
  if (!vaga) {
    localStorage.removeItem(vagaParaEditarLocalStorageKey);  
    return;
  }
  localStorage.setItem(vagaParaEditarLocalStorageKey, JSON.stringify(vaga))
}