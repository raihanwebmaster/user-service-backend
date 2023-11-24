"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodValidation = void 0;
const zod_1 = require("zod");
const handleZodValidation = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                const validationErrors = err.errors.map(error => ({
                    path: error.path.join('.'),
                    message: error.message,
                }));
                res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: validationErrors,
                });
            }
            else {
                next(err);
            }
        }
    };
};
exports.handleZodValidation = handleZodValidation;
