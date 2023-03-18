import { Router } from "express"

const router = Router()

type Course = {
  id: number,
  name:  string
}
const courses: Course[] = [
  { id: 1, name: 'computer science'},
  { id: 2, name: 'information technology'},
  { id: 3, name: 'business intelligence'}
]

// idを採番する
type Sequence = {
  next: () => number
}
const sequence: Sequence = ((start) => {
  let current = start ?? 0
  return {
    next () {
      return ++current
    }
  }
})(Math.max(...courses.map((course) => course.id)))

router.get('/', (req, res) => {
  res.send(courses)
})

router.post('/', (req, res) => {
  const course: Course = {
    id: sequence.next(),
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

router.put('/:id', (req, res) => {
  const course = courses.find((course) => course.id === parseInt(req.params.id))
  if (!course) {
    // 指定されたidのcourseが存在しない場合
    return res.status(404).send('The course with the given ID was not found.')
  }

  course.name = req.body.name
  res.send(course)
})

router.delete('/:id', (req, res) => {
  const course = courses.find((course) => course.id === parseInt(req.params.id))
  if (!course) {
    // 指定されたidのcourseが存在しない場合
    return res.status(404).send('The course with the given ID was not found.')
  }

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.send(course)
})

export default router
