export declare interface User {
  encryptedUserId?: string;
  userName: string;
  userBirth: string;
  userEmail: string;
  userPhone: string;
  userAnswers?: UserAnswer[];
}

export declare interface UserAnswer {
  userId?: number;
  questionId: number;
  answerId: number;
}
