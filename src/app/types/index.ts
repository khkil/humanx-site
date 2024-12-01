export declare type Status = "success" | "fail";

export declare interface Response {
  status: Status;
  data: object | Array<any>;
  message: string;
}

export declare type Theme = "info" | "error" | "success" | "warning" | "normal";
