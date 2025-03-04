import {
  QuizAnswerRequestDTO,
  QuizQuestionRequestDTO,
  QuizStartRequestDTO,
} from "@/entities/quiz/types";
import { API_URL, BASE_OPTIONS, responseInterceptor } from "@/shared/model";

export const QuizService = {
  startQuiz: async (body: QuizStartRequestDTO) => {
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      ...BASE_OPTIONS,
    };

    return responseInterceptor(`${API_URL}/quiz/start`, options);
  },

  finishQuiz: async (id: string) => {
    const options = {
      method: "PATCH",
      ...BASE_OPTIONS,
    };

    return responseInterceptor(`${API_URL}/quiz/finish/${id}`, options);
  },

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
