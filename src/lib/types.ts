export interface SimplificationOptions {
  model: string;
  simplicity: number;
  readingLevel: "elementary" | "middle" | "high" | "college";
  tone: "neutral" | "casual" | "formal" | "friendly" | "professional";
}

export interface SimplificationResult {
  text: string;
  stats?: {
    percentSimpler: number;
    gradeLevel: number;
  };
}

export interface SimplificationHistoryItem {
  originalText: string;
  result: SimplificationResult;
  createdAt: string; // ISO string
}

export interface ExpertRequest {
  description: string;
  email: string;
  urgency: "standard" | "urgent" | "express";
}
