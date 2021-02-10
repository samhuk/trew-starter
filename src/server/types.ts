import { Request, Response, ParamsDictionary } from 'express-serve-static-core'

export type AnyRequest = Request<ParamsDictionary, any, any>
export type AnyResponse = Response<any>
