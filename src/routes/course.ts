import { Router } from "express"
import { deleteCourse, findCourseById, insertCourse, listCourse, updateCourse } from "../repositories/course-repository"

const router = Router()

router.get('/', (req, res) => {
  listCourse().then((courses) => res.send(courses))
})

router.post('/', (req, res) => {
  insertCourse({ name: req.body.name })
    .then((course) => res.send(course))
})

router.put('/:id', async (req, res) => {
  const course = await findCourseById(parseInt(req.params.id))
  if (!course) {
    // 指定されたidのcourseが存在しない場合
    return res.status(404).send('The course with the given ID was not found.')
  }

  const updated = await updateCourse({
    ...course,
    ...req.body
  })

  res.send(updated)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const course = await findCourseById(id)
  if (!course) {
    // 指定されたidのcourseが存在しない場合
    return res.status(404).send('The course with the given ID was not found.')
  }

  await deleteCourse(id)

  res.send(course)
})

export default router
