declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';
    import { ParsedUrlQuery } from 'querystring';
  
    type Middleware<Req, Res> = (
      req: Req,
      res: Res,
      next: (err?: any) => void
    ) => void;
  
    type RequestHandler<Req, Res> = (
      req: Req,
      res: Res
    ) => void | Promise<void>;
  
    interface Options<Req, Res> {
      onError?: (err: any, req: Req, res: Res, next: (err?: any) => void) => void;
      onNoMatch?: (req: Req, res: Res) => void;
      attachParams?: boolean;
    }
  
    interface NextConnect<Req, Res> {
      use(...middlewares: Array<Middleware<Req, Res>>): this;
      get(handler: RequestHandler<Req, Res>): this;
      get(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      post(handler: RequestHandler<Req, Res>): this;
      post(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      put(handler: RequestHandler<Req, Res>): this;
      put(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      delete(handler: RequestHandler<Req, Res>): this;
      delete(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      patch(handler: RequestHandler<Req, Res>): this;
      patch(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      options(handler: RequestHandler<Req, Res>): this;
      options(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      head(handler: RequestHandler<Req, Res>): this;
      head(
        path: string,
        handler: RequestHandler<Req, Res>
      ): this;
      handler(
        req: Req,
        res: Res
      ): void;
    }
  
    function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: Options<Req, Res>
    ): NextConnect<Req, Res>;
  
    export = nextConnect;
  }
  