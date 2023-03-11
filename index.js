const express = require('express')
const app = express()

app.use(express.json())

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

// idを採番する
const sequence = ((start) => {
  let current = start ?? 0
  return {
    next () {
      return ++current
    }
  }
})(Math.max(...courses.map((course) => course.id)))

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.post('/api/courses', (req, res) => {
  const course = {
    id: sequence.next(),
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((course) => course.id === parseInt(req.params.id))
  if (!course) {
    // 指定されたidのcourseが存在しない場合
    return res.status(404).send('The course with the given ID was not found.')
  }

  course.name = req.body.name
  res.send(course)
})