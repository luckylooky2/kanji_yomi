import {
  QuizAnswerRequestDTO,
  QuizQuestionRequestDTO,
} from "@/entities/quiz/types";
import { API_URL, BASE_OPTIONS, responseInterceptor } from "@/shared/model";

export const QuizService = {
  getQuestion: async (body: QuizQuestionRequestDTO) => {
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      ...BASE_OPTIONS,
    };

    return responseInterceptor(`${API_URL}/quiz/question`, options);
  },

  getAnswer: async (body: QuizAnswerRequestDTO) => {
    // TODO: 팩토리 패턴
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      ...BASE_OPTIONS,
    };

    return responseInterceptor(`${API_URL}/quiz/answer`, options);
  },
};
