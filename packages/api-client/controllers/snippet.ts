import { autoBind } from '~/utils/auto-bind'
import type { IRequestAdapter } from '~/interfaces/adapter'
import type { IController } from '~/interfaces/controller'
import type { IRequestHandler } from '~/interfaces/request'
import type { HTTPClient } from '../core'

declare module '../core/client' {
  interface HTTPClient<
    T extends IRequestAdapter = IRequestAdapter,
    ResponseWrapper = unknown,
  > {
    snippet: SnippetController<ResponseWrapper>
  }
}

export class SnippetController<ResponseWrapper> implements IController {
  base = 'snippets'
  name = 'snippet'

  constructor(protected client: HTTPClient) {
    autoBind(this)
  }

  get proxy(): IRequestHandler<ResponseWrapper> {
    return this.client.proxy(this.base)
  }

  // getById(id: string) {
  //   return this.proxy(id).get<Omit<SnippetModel, 'data'>>()
  // }

  getByReferenceAndName<T = unknown>(reference: string, name: string) {
    return this.proxy(reference)(name).get<T>()
  }
}
