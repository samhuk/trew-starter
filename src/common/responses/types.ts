import { OutputError } from '../errors/types';

export type ResponseBase<TData = any> = {
  error: OutputError
  data: TData
}
