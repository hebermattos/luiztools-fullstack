import Joi from "joi"
import { accountStatus } from "./accountStatus"

export interface IAccount{
    id: number,
    name: string,
    email: string,
    password: string,
    status: accountStatus
}

const accountSchema = Joi.object({
    id: Joi.number().integer().min(1),
    name: Joi.string().alphanum().min(3).max(150).required(),
    email: Joi.string().email().min(8).max(150).required(),
    password: Joi.string().alphanum().min(6).max(50).required(),
    status: Joi.number().integer()
})

export default accountSchema;