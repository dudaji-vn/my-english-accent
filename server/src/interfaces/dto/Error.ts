export class UnAuthorizeError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnAuthorizeError'
    // Set the prototype explicitly to ensure proper inheritance
    Object.setPrototypeOf(this, UnAuthorizeError.prototype)
  }
}
