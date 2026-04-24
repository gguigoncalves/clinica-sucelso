const express = require('express')
const cors = require('cors')
const patientRoutes = require('./routes/patientRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/patients', patientRoutes)

app.get('/', (req, res) => res.json({ status: 'API rodando' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`))

module.exports = app