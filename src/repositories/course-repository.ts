import { PrismaClient, Course } from '@prisma/client'

const prisma = new PrismaClient()

export function listCourse (): Promise<Course[]> {
  return prisma.course.findMany()
}

export function findCourseById (id: number): Promise<Course | null> {
  return prisma.course.findUnique({
    where: {
      id
    }
  })
}

export function insertCourse (course: Omit<Course, 'id'>): Promise<Course> {
  return prisma.course.create({
    data: course
  })
}

export function updateCourse (course: Course): Promise<Course> {
  return prisma.course.update({
    where: {
      id: course.id
    },
    data: course
  })
}

export function deleteCourse (id: number): Promise<Course> {
  return prisma.course.delete({
    where: {
      id
    }
  })
}
