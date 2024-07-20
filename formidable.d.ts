declare module 'formidable' {
    import { IncomingMessage } from 'http';
    import { EventEmitter } from 'events';
  
    interface File {
      size: number;
      path: string;
      name: string;
      type: string;
      lastModifiedDate?: Date;
      hash?: string;
    }
  
    interface Fields {
      [key: string]: string | string[];
    }
  
    interface Files {
      [key: string]: File | File[];
    }
  
    interface FormidableError extends Error {
      httpCode?: number;
    }
  
    interface IncomingForm extends EventEmitter {
      encoding: string;
      uploadDir: string;
      keepExtensions: boolean;
      maxFileSize: number;
      maxFields: number;
      maxFieldsSize: number;
      hash: string | boolean;
      multiples: boolean;
  
      parse(
        req: IncomingMessage,
        callback?: (
          err: FormidableError,
          fields: Fields,
          files: Files
        ) => void
      ): void;
    }
  
    interface FormidableOptions {
      encoding?: string;
      uploadDir?: string;
      keepExtensions?: boolean;
      maxFileSize?: number;
      maxFields?: number;
      maxFieldsSize?: number;
      hash?: string | boolean;
      multiples?: boolean;
    }
  
    const IncomingForm: {
      new (options?: FormidableOptions): IncomingForm;
    };
  
    export = IncomingForm;
  }
  