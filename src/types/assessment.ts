export declare interface AssessmentDetail {
  assessmentName: string;
  totalPage: number;
}

export declare interface AssessmentPagesQuestion {
  questionId: number;
  questionTitle: string;
  questionPage: number;
  answers: Array<{
    answerId: number;
    answerTitle: string;
    answerScore: number;
  }>;
}
