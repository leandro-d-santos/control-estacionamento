
function mostrarToastSucesso(text) {
  const toast = createToastElement('text-bg-success');
  createToastAndShowToast(toast, text);
}

function mostrarToastErro(text) {
  const toast = createToastElement('text-bg-danger');
  createToastAndShowToast(toast, 'Erro: ' + text);
}

function createToastAndShowToast(toastElement, message) {
  const toastBody = createToastBody(message);
  toastElement.appendChild(createToastFlexContainer(toastBody));
  const container = createTostContainer();
  toastElement.addEventListener('hide.bs.toast', () => {
    document.body.removeChild(container);
  });
  container.appendChild(toastElement);
  document.body.appendChild(container);
  showToast(toastElement);
}

function createToastFlexContainer(toastBody) {
  const flexContainer = document.createElement('div');
  flexContainer.classList.add('d-flex');
  flexContainer.appendChild(toastBody);
  flexContainer.innerHTML+='<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>';
  return flexContainer;
}

function showToast(toast) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
  toastBootstrap.show()
}

function createTostContainer() {
  const toasContainer = document.createElement('div');
  toasContainer.classList.add('toast-container', 'position-fixed', 'top-0', 'end-0', 'p-3')
  return toasContainer;
}

function createToastElement(colorClass) {
  const toast = document.createElement('div');
  toast.id = 'toast'
  toast.classList.add('toast', 'align-items-center', colorClass)
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';
  return toast;
}

function createToastBody(text) {
  const toastBody = document.createElement('div');
  toastBody.classList.add('toast-body');
  toastBody.textContent = text;
  return toastBody;
}