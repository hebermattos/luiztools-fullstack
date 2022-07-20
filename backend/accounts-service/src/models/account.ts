import Joi from "joi"
import { accountStatus } from "./accountStatus"

export interface IAccount{
    id?: number,
    name: string,
    email: string,
    password: string,
    status?: accountStatus,
    domain: string
}

export interface ILoginAccount{
    email: string,
    password: string,
}

const accountUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(150),
    password: Joi.string().min(6).max(50),
    status: Joi.number().integer(),
    domain: Joi.string().min(5).max(150)
})

const accountSchema = Joi.object({
    id: Joi.number().integer().min(1),
    name: Joi.string().min(3).max(150).required(),
    email: Joi.string().email().min(8).max(150).required(),
    password: Joi.string().min(6).max(50).required(),
    status: Joi.number().integer(),
    domain: Joi.string().min(5).max(150).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().min(8).max(150).required(),
    password: Joi.string().min(6).max(50).required(),
})

export { accountSchema, accountUpdateSchema, loginSchema };