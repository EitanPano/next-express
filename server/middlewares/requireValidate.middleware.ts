import { NextFunction, Request, Response } from "express";
import { validateData } from "../services/validator.service";

const requireValidate = (req: Request, res: Response, next: NextFunction) => {
    const { errors, isValid } = validateData(req.body, req.originalUrl);

    if (!isValid) {
        res.status(400).send({ message: 'Invalid data insertion attempt.', errors });
        return;
    }
    next();
};

export default requireValidate