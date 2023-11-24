/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const handleZodValidation = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message,
        }));
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: validationErrors,
        });
      } else {
        next(err);
      }
    }
  };
};