export class BaseResponse<T = any> {
  public isError: boolean;
  public message: string;
  public data: T;
}
