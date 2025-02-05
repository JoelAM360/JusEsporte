export class ApiException extends Error {
  public readonly message: string = "";
  public errors: string[];

  constructor(message: string, errors: string[]) {
    super();

    this.message = message;
    this.errors = errors;
  }
}
