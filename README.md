# feedback-arquitetura2

✅package.json (jordana)
✅tsconfig.json (jordana)
/src
  ✅index.ts (Felipe)
  ✅types.ts (Luan)
  /models
    ✅ Course.ts (Felipe)
  /router
   ✅ courseRouter.ts (Anderson) 
  /controller
    ✅ CourseController.ts (Amanda)
  /business
    ✅CourseBusiness.ts(ozeias)
  /database
    ✅ BaseDatabase.ts (Laércio)
    ✅ CourseDatabase.ts (Laércio)
    ✅ database.sql (yuzo)
    ✅ database.db (yuzo)
  /errors
   ✅ BaseError.ts (Anderson)
   ✅ BadRequestError.ts (Anderson)
     ✅NotFoundError.ts (Raimundo)


CourseDatabase
    findCourses (yuzo)
    findCourseById
    insertCourse
    updateCourse
    deleteCourse ()