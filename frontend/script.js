const API = 'https://sua-api.vercel.app/api/patients' // troque pela URL do deploy

const form = document.getElementById('patient-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const idInput = document.getElementById('patient-id')
const submitBtn = document.getElementById('submit-btn')
const cancelBtn = document.getElementById('cancel-btn')
const tbody = document.getElementById('patients-body')

async function fetchPatients() {
  const res = await fetch(API)
  const patients = await res.json()
  renderTable(patients)
}

function renderTable(patients) {
  tbody.innerHTML = ''
  patients.forEach(p => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>
        <button class="edit" onclick="editPatient('${p.id}','${p.name}','${p.email}')">Editar</button>
        <button class="danger" onclick="deletePatient('${p.id}')">Excluir</button>
      </td>`
    tbody.appendChild(tr)
  })
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const body = { name: nameInput.value, email: emailInput.value }
  const id = idInput.value

  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  }

  resetForm()
  fetchPatients()
})

function editPatient(id, name, email) {
  idInput.value = id
  nameInput.value = name
  emailInput.value = email
  submitBtn.textContent = 'Atualizar'
  cancelBtn.hidden = false
}

async function deletePatient(id) {
  if (!confirm('Excluir este paciente?')) return
  await fetch(`${API}/${id}`, { method: 'DELETE' })
  fetchPatients()
}

cancelBtn.addEventListener('click', resetForm)

function resetForm() {
  form.reset()
  idInput.value = ''
  submitBtn.textContent = 'Salvar'
  cancelBtn.hidden = true
}

fetchPatients()