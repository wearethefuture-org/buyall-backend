class HttpError extends Error {
  constructor(statusCode, body, status = undefined) {
    super(body);
    this.expose = true;

    this.statusCode = statusCode;
    this.body = body;
    this.status = status;
  }
}

module.exports = HttpError;
