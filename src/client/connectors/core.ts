import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { OutputError } from '../../common/errors/types'
import { ResponseBase } from '../../common/responses/types'

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

const absoluteUrl = (relativeUrl: string) => `${window.location.protocol}//${window.location.host}/api/${relativeUrl}`

const mapValueToQueryParameterValue = (v: any): string => v != null ? encodeURIComponent(v.toString()) : ''

const parseQueryParameters = (queryParameters: { [param: string]: any }): string => {
  if (queryParameters == null || Object.keys(queryParameters).length === 0)
    return '';

  return Object.entries(queryParameters).reduce((acc, [k, v]) => acc.concat(`&${k}=${mapValueToQueryParameterValue(v)}`), '?')
}

// const normalizeResponse = (res: AjaxResponse): ResponseBase => {
//   if (res.status != 200)
// }

export const get = <TResponseData>(
  url: string,
  queryParameters?: { [param: string]: any },
  headers: { [headerName: string]: string } = DEFAULT_HEADERS,
  responseType = 'json'
) => ajax({
  url: absoluteUrl(url).concat(parseQueryParameters(queryParameters)),
  method: 'GET',
  headers,
  responseType,
}).pipe(
  map(res => res.response as ResponseBase<TResponseData>),
  catchError(err => of(err.response as ResponseBase<TResponseData>)),
).toPromise()

export const post = <TResponseData>(
  url: string,
  body: any,
  queryParameters?: { [param: string]: any },
  headers: { [headerName: string]: string } = DEFAULT_HEADERS,
  responseType = 'json'
) => ajax({
  url: absoluteUrl(url).concat(parseQueryParameters(queryParameters)),
  method: 'POST',
  headers,
  responseType,
  body: JSON.stringify(body),
}).pipe(
  catchError((err, caught) => {
    return caught
  }),
  map(res => ({ error: res.response.error as OutputError, data: res.response.data as TResponseData }))
).toPromise()