// lib/evla/types.ts
export interface Impulse {
  text: string;
  domain: "MEDICAL";
  timestamp: string;
}

export interface Possibility {
  id: number;
  label: string;
  hypothesis: string;
  score: number;
  risk: number;
}

export interface Choice {
  selectedId: number;
  reason: string;
  criteria: string[];
}

export interface Observation {
  outcome: string;
  explanation: string;
  notes?: string;
}

export interface EvlaLog {
  impulse: Impulse;
  possibilities: Possibility[];
  choice: Choice;
  observation: Observation;
}

export interface EvlaRunRequest {
  prompt: string;
  domain?: "MEDICAL";
}

export interface EvlaRunResponse {
  log: EvlaLog;
}
