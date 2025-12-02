import { validationResult } from "express-validator";

export const validate = (validations) => async (req, res, next) => {

    await Promise.all(
        validations.map((validate) => { return validate.run(req)} )
    )

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json( error.array());
    }
    return next();
}