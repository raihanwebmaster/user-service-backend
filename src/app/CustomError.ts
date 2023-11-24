export class CustomError extends Error {
  code?: number;
  description?: string;

  constructor(message: string, code?: number, description?: string) {
    super(message);
    this.code = code;
    this.description = description;
  }
}
