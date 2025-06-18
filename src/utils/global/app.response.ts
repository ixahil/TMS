class AppResponse<T = unknown> {
  statusCode: number;
  data: T | null;
  message: string;

  constructor(statusCode: number, data: T | null = null, message = '') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export default AppResponse;
