import { anthropic } from "@ai-sdk/anthropic";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { titleModel } from "./models";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        chatModel,
        titleModel: mockTitleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": mockTitleModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  // Use Anthropic from AI-SDK instead of Gateway
  const id = modelId.startsWith("anthropic/") ? modelId.slice(10) : modelId;
  return anthropic(id);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  // Use Anthropic from AI-SDK instead of Gateway
  const id = titleModel.id.startsWith("anthropic/")
    ? titleModel.id.slice(10)
    : titleModel.id;
  return anthropic(id);
}
