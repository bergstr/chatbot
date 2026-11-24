export const DEFAULT_CHAT_MODEL = "anthropic/claude-sonnet-5-5";

export const titleModel = {
  description: "Fast, near-frontier intelligence at the lowest cost.",
  id: "anthropic/claude-haiku-5-5",
  name: "Claude Haiku 5.5",
  provider: "anthropic",
};

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  gatewayOrder?: string[];
  reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high";
  supported_parameters?: string[];
};

export const chatModels: ChatModel[] = [
  {
    description: "Fast, near-frontier intelligence at the lowest cost.",
    id: "anthropic/claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "anthropic",
    supported_parameters: [
      "max_tokens",
      "stop",
      "tools",
      "tool_choice",
      "reasoning",
      "include_reasoning",
      "response_format",
      "structured_outputs",
    ],
  },
  {
    description: "Balanced speed, cost, and intelligence.",
    id: "anthropic/claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    provider: "anthropic",
    supported_parameters: [
      "max_tokens",
      "stop",
      "tools",
      "tool_choice",
      "reasoning",
      "include_reasoning",
      "response_format",
      "structured_outputs",
    ],
  },
  {
    description: "Powerful model for complex work.",
    id: "anthropic/claude-opus-5-5",
    name: "Claude Opus 5.5",
    provider: "anthropic",
    supported_parameters: [
      "max_tokens",
      "stop",
      "tools",
      "tool_choice",
      "reasoning",
      "include_reasoning",
      "response_format",
      "structured_outputs",
    ],
  },
  {
    description: "Flagship model for the hardest problems.",
    id: "anthropic/claude-fable-5-2",
    name: "Claude Fable 5.2",
    provider: "anthropic",
    supported_parameters: [
      "max_tokens",
      "stop",
      "tools",
      "tool_choice",
      "reasoning",
      "include_reasoning",
      "response_format",
      "structured_outputs",
    ],
  },
];

export async function getCapabilities(): Promise<
  Record<string, ModelCapabilities>
> {
  const results = chatModels.map((model) => {
    const params = new Set(model.supported_parameters || []);
    return [
      model.id,
      {
        reasoning: params.has("reasoning"),
        tools: params.has("tools"),
        vision: params.has("vision"),
      },
    ];
  });

  return Object.fromEntries(results);
}

export const isDemo = process.env.IS_DEMO === "1";

export type GatewayModelWithCapabilities = ChatModel & {
  capabilities: ModelCapabilities;
};

export async function getAllGatewayModels(): Promise<
  GatewayModelWithCapabilities[]
> {
  return [];
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);

export type ModelAvailability = "healthy" | "impacted" | "unknown";

export async function getModelAvailability(
  _modelId: string
): Promise<ModelAvailability> {
  return "unknown";
}
