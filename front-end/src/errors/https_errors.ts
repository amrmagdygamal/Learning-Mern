class HttpError extends Error {
  constructor (message?: string) {

    super(message);
    this.name = this.constructor.name;
  }
}


/**
 * 401, status error
 */
export class UnauthorizedError extends HttpError {}



/**
 * status code: 409
 */
export class ConflictError extends HttpError {}