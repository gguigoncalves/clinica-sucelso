const Patient = require('../models/patientModel')

async function index(req, res) {
  try {
    const patients = await Patient.findAll()
    res.json(patients)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function show(req, res) {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' })
    res.json(patient)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function store(req, res) {
  try {
    const { name, email } = req.body
    if (!name || !email) return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    const patient = await Patient.create({ name, email })
    res.status(201).json(patient)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function update(req, res) {
  try {
    const { name, email } = req.body
    const patient = await Patient.update(req.params.id, { name, email })
    res.json(patient)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function destroy(req, res) {
  try {
    await Patient.remove(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { index, show, store, update, destroy }