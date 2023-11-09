import { Request, Response } from 'express';
import { BaseError } from '../errors/BaseError';
import { CourseBusiness } from '../business/CourseBusiness';

export class CourseController {
  public getCourses = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q as string | undefined,
      };

      const courseBusiness = new CourseBusiness();
      const output = await courseBusiness.getCourses(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };

  public createCourse = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id as string,
        name: req.body.name as string,
        lessons: req.body.lessons as number,
      };

      const courseBusiness = new CourseBusiness();
      const output = await courseBusiness.createCourse(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };

  public updateCourse = async (req: Request, res: Response) => {
    try {
      const input = {
        idToEdit: req.params.id,
        newId: req.body.id as string,
        newName: req.body.name as string,
        newLessons: req.body.lessons as string,
      };

      const courseBusiness = new CourseBusiness();
      const output = await courseBusiness.updateCourse(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };

  public deleteCourse = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
      };

      const courseBusiness = new CourseBusiness();
      const output = await courseBusiness.deleteCourse(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Erro inesperado');
      }
    }
  };
}