const express = require('express')
const app = express()

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

app.get('/', (req, res) => {
  res.send('Simple REST API')
})

const courses = [
  { id: 1, name: 'computer science'},
  { id: 2, name: 'information technology'},
  { id: 3, name: 'business intelligence'}
]

app.get('/api/courses', (req, res) => {
  res.send(courses)
})
