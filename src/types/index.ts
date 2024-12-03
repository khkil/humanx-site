export declare type Status = 'success' | 'fail';

export declare interface Response {
  status: Status;
  data: object | Array<any>;
  message: string;
}
