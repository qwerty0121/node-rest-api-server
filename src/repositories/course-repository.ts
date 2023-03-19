import { OkPacket, RowDataPacket } from 'mysql2'
import { pool } from '../database'
import { Course, CoursePk } from '../types/entity/course'

export function listCourse (): Promise<Course[]> {
  return new Promise((resolve) => {
    pool.query(
      'select * from course',
      (error, results) => {
        if (error) {
          throw error
        }
        resolve(results as Course[])
      }
    )
  })
}

export function findCourseById (id: CoursePk): Promise<Course> {
  return new Promise((resolve) => {
    pool.query(
      'select * from course where id = ?',
      id,
      (error, results: RowDataPacket[]) => {
        if (error) {
          throw error
        }
        const [course] = results
        resolve(course as Course)
      }
    )
  })
}

export function insertCourse (course: Omit<Course, 'id'>): Promise<Course> {
  return new Promise((resolve) => {
    pool.query(
      'insert into course set ?',
      course,
      (error, result: OkPacket) => {
        if (error) {
          throw error
        }
        resolve({
          id: result.insertId,
          ...course
        })
      }
    )
  })
}

export function updateCourse (course: Course): Promise<Course> {
  const { id, ...courseWithoutId} = course
  return new Promise((resolve) => {
    pool.query(
      'update course set ? where id = ?',
      [courseWithoutId, id],
      (error) => {
        if (error) {
          throw error
        }
        resolve(course)
     }
    )
  })
}

export function deleteCourse (id: CoursePk): Promise<void> {
  return new Promise((resolve) => {
    pool.query(
      'delete from course where id = ?',
      id,
      (error) => {
        if (error) {
          throw error
        }
        resolve()
     }
    )
  })
}