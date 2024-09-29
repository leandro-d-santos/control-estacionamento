const cadastrarBotao = document.getElementById('cadastrar');
const codigoInput = document.getElementById('codigoInput');
const proprietarioInput = document.getElementById('proprietarioInput');
const numeroApartamentoInput = document.getElementById('numeroApartamentoInput');
const blocoApartamentoInput = document.getElementById('blocoApartamentoInput');
const placaVeiculoInput = document.getElementById('placaVeiculoInput');
const modeloVeiculoInput = document.getElementById('modeloVeiculoInput');
const corVeiculoInput = document.getElementById('corVeiculoInput');
const numeroVagaInput = document.getElementById('numeroVagaInput');

(function () {
  addControlEvents();
  cadastrarBotao.addEventListener('click', cadastrar);
  const editingVaga = getVagaParaEditar();
  if (!editingVaga) return;
  const {
    id,
    proprietario,
    numeroApartamento,
    blocoApartamento,
    placaVeiculo,
    modeloVeiculo,
    corVeiculo,
    numeroVaga
  } = editingVaga;
  codigoInput.value = id;
  proprietarioInput.value = proprietario;
  numeroApartamentoInput.value = numeroApartamento;
  blocoApartamentoInput.value = blocoApartamento;
  placaVeiculoInput.value = placaVeiculo;
  modeloVeiculoInput.value = modeloVeiculo;
  corVeiculoInput.value = corVeiculo;
  numeroVagaInput.value = numeroVaga;
  changeRegisterButtonTextToSave();
}());

function addControlEvents() {
  const formControls = document.getElementsByClassName('form-control');
  for (const control of formControls) {
    if (!(control instanceof HTMLInputElement)) continue;
    control.addEventListener('blur', (_) => {
      const controlValue = control.value || '';
      if (!controlValue.trim()) {
        addInvalidFormControlClass(control);
      } else {
        removeInvalidFormControlClass(control);
      }
    });
  }
}

function isEditing() {
  const id = codigoInput.value || '';
  return id.trim() !== '';
}

function cadastrar() {
  if (!validForm()) return;

  const vagas = getVagas();
  let vaga;
  if (isEditing()) {
    const id = convertToInt(codigoInput.value);
    vaga = vagas.find(item => item.id === id);
  } else {
    const numeroVaga = convertToInt(numeroVagaInput.value);
    if (vagas.some((vaga => vaga.numeroVaga === numeroVaga))) {
      mostrarToastErro('Vaga já cadastrada');
      return;
    }
    vaga = {
      id: getNextId(vagas),
    };
    vagas.push(vaga);
  }

  vaga.proprietario = proprietarioInput.value;
  vaga.numeroApartamento = convertToInt(numeroApartamentoInput.value);
  vaga.blocoApartamento = blocoApartamentoInput.value;
  vaga.placaVeiculo = placaVeiculoInput.value;
  vaga.modeloVeiculo = modeloVeiculoInput.value;
  vaga.corVeiculo = corVeiculoInput.value;
  vaga.numeroVaga = convertToInt(numeroVagaInput.value);
  setVagas(vagas);
  resetFormControls();
  console.log('vagas: ', vagas);
  console.log('nova vaga: ', vaga);
  mostrarToastSucesso('Salvo com sucesso!');
  if (isEditing()) {
    changeRegisterButtonTextToAdd();
    setVagaParaEditar(undefined);
  }
}

function changeRegisterButtonTextToSave() {
  cadastrarBotao.textContent = 'Salvar';
}

function changeRegisterButtonTextToAdd() {
  cadastrarBotao.textContent = 'Cadastrar';
}

function getNextId(vagas) {
  return vagas.reduce((prev, curr) => curr.id > prev ? curr.id : prev, 0) + 1;
}

function resetFormControls() {
  const formControls = document.getElementsByClassName('form-control');
  for (const control of formControls) {
    if (!(control instanceof HTMLInputElement)) continue;
    control.value = '';
  }
}

function convertToInt(text) {
  return Number.parseInt(text)
}

/**
 * @returns boolean
 */
function validForm() {
  const formControls = document.getElementsByClassName('form-control');
  let valid = true;
  for (const control of formControls) {
    if (!(control instanceof HTMLInputElement)) continue;
    if (!control.checkValidity()) {
      valid = false;
      addInvalidFormControlClass(control);
      continue;
    }
    removeInvalidFormControlClass(control);
  }
  return valid
}

/**
 * 
 * @param {HTMLInputElement} control 
 */
function addInvalidFormControlClass(control) {
  control.classList.add('is-invalid');
}

/**
 * 
 * @param {HTMLInputElement} control 
 */
function removeInvalidFormControlClass(control) {
  control.classList.remove('is-invalid');
}