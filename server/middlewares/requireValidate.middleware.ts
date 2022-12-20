import { NextFunction, Request, Response } from "express";
import { validateData } from "../services/validator.service";

const requireValidate = (req: Request, res: Response, next: NextFunction) => {
    const isValid = validateData(req.body, req.originalUrl);

    if (!isValid) {
        res.status(400).send('Invalid data insertion attempt.');
        return;
    }
    next();
};

export default requireValidate