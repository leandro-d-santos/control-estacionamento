const tableBody = document.getElementById('tableBody');
const homeLink = document.getElementById('homeLink');
const vagas = getVagas();

(function () {
  if (!vagas || vagas.length <= 0) {
    addEmptyMessage();
    return;
  }
  for (const vaga of vagas) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(createTableButtons(tableRow, vaga));
    for (const prop in vaga) {
      if (prop === 'id') continue;
      const column = document.createElement('td');
      column.textContent = vaga[prop];
      tableRow.appendChild(column);
    }
    tableBody.appendChild(tableRow);
  }
}());

function addEmptyMessage() {
  const row = document.createElement('tr');
  const column = document.createElement('td');
  column.colSpan = '8';
  const div = document.createElement('div');
  div.style.width = '100%';
  div.style.textAlign = 'center';
  div.textContent = 'Não há vagas';
  column.appendChild(div);
  row.appendChild(column);
  tableBody.appendChild(row);
}

function createTableButtons(tableRow, vaga) {
  const buttonsContainer = document.createElement('td');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.justifyContent = 'center';
  buttonsContainer.style.gap = '5px';
  const editButton = createEditButton();
  buttonsContainer.appendChild(editButton);
  const removeButton = createRemoveButton();
  buttonsContainer.appendChild(removeButton);

  editButton.addEventListener('click', editClick(vaga));
  removeButton.addEventListener('click', removeClick(tableRow, vaga));

  return buttonsContainer;
}

function editClick(vaga) {
  return () => {
    setVagaParaEditar(vaga);
    homeLink.click();
  }
}

function removeClick(tableRow, vaga) {
  return () => {
    const response = confirm('Você confirmar a remoção?');
    if (!response) return;
    const index = vagas.indexOf(vaga);
    if (index === -1) return;
    vagas.splice(index, 1);
    tableBody.removeChild(tableRow);
    setVagas(vagas);
    mostrarToastSucesso('Removido com sucesso!');
    if (vagas.length === 0) {
      addEmptyMessage();
    }
  }
}

function createEditButton() {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  const buttonIcon = document.createElement('i');
  buttonIcon.classList.add('bi', 'bi-pencil')
  button.appendChild(buttonIcon);
  return button;
}

function createRemoveButton() {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  const buttonIcon = document.createElement('i');
  buttonIcon.classList.add('bi', 'bi-trash')
  button.appendChild(buttonIcon);
  return button;
}

