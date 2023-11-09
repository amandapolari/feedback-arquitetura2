import { CourseDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class CourseDatabase extends BaseDatabase {
  public static TABLE_COURSES = "courses"

  public findCourses = async (name: string | undefined): Promise<CourseDB[]> => {
    if (name) {
      const result: CourseDB[] = await BaseDatabase
        .connection(CourseDatabase.TABLE_COURSES)
        .select()
        .where('name', 'LIKE', `%${name}%`)

      return result

    } else {
      const result: CourseDB[] = await BaseDatabase
        .connection(CourseDatabase.TABLE_COURSES)
        .select()

      return result
    }
  }

  public findCourseById = async (id: string): Promise<CourseDB | undefined> => {
    const [course]: CourseDB[] | undefined = await BaseDatabase
      .connection(CourseDatabase.TABLE_COURSES)
      .where({ id })

    return course
  }

  public insertCourse = async (course: CourseDB): Promise<void> => {
    await BaseDatabase
      .connection(CourseDatabase.TABLE_COURSES)
      .insert(course)
  }

  public async updateCourse(id: string, updatedCourse: CourseDB) {
    await BaseDatabase
      .connection(CourseDatabase.TABLE_COURSES)
      .where({ id })
      .update(updatedCourse);
  }

  public deleteCourse = async (idToDelete: string): Promise<void> => {
    await BaseDatabase.connection(CourseDatabase.TABLE_COURSES)
      .where({ id: idToDelete })
      .del();
  }
}
