import { CourseDB } from '../types';
import { CourseDatabase } from "../database/CourseDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Course } from "../models/Course"
import { NotFoundError } from '../errors/NotFoundError';

export class CourseBusiness {
  public getCourses = async (input: any) => {
    const { q } = input

    const courseDatabase = new CourseDatabase()
    const coursesDB = await courseDatabase.findCourses(q)

    const course = coursesDB.map((courseDB) => new Course(
      courseDB.id,
      courseDB.name,
      courseDB.lessons
    ))

    return course
  }

  public createCourse = async (input: any) => {
    const { id, name, lessons } = input

    if (id === undefined) {
      throw new BadRequestError("'id' é obrigário no corpo da requisição")
    }

    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string")
    }

    if (name === undefined) {
      throw new BadRequestError("'name' é obrigário no corpo da requisição")
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string")
    }

    if (lessons === undefined) {
      throw new BadRequestError("'lessons' é obrigário no corpo da requisição")
    }

    if (typeof lessons !== "number") {
      throw new BadRequestError("'lessons' deve ser number")
    }

    const courseDatabase = new CourseDatabase()
    const courseDBExists = await courseDatabase.findCourseById(id)

    if (courseDBExists) {
      throw new Error("'id' já existe")
    }

    const newCourse = new Course(
      id,
      name,
      lessons
    )


    const newCourseDB: CourseDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      lessons: newCourse.getLessons()
    }

    await courseDatabase.insertCourse(newCourseDB)

    const output = {
      message: "Cadastro realizado com sucesso",
      course: newCourse
    }

    return output
  }

  public updateCourse = async (input: any) => {
    const { idToEdit, newId, newName, newLessons } = input;

    const courseDatabase = new CourseDatabase();
    const courseDB = await courseDatabase.findCourseById(idToEdit)

    if (!courseDB) {
      throw new NotFoundError("Curso não existe.")
    }

    const course = new Course(
      courseDB.id,
      courseDB.name,
      courseDB.lessons
    );

    course.setId(newId)
    course.setName(newName)
    course.setLessons(newLessons)

    const updatedCourseDB: CourseDB = {
      id: course.getId(),
      name: course.getName(),
      lessons: course.getLessons()
    }

    await courseDatabase.updateCourse(idToEdit, updatedCourseDB);

    const output = {
      message: "Curso atualizado com sucesso",
      course: course
    };

    return output;
  };

  public deleteCourse = async (input: any) => {
    const { id } = input

    const courseDatabase = new CourseDatabase()

    const existingCourse = await courseDatabase.findCourseById(id)
    if (!existingCourse) {
      throw new BadRequestError("Curso não encontrado")
    }

    await courseDatabase.deleteCourse(id)

    const output = {
      message: "Curso excluído com sucesso",
      courseId: id
    }

    return output
  }
}
