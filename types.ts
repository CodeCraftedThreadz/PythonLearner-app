
export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown-like content
  initialCode: string;
  expectedOutputRegex?: string; // Simple regex for validation if needed
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface ExecutionResult {
  output: string;
  error?: boolean;
}

export type AppView = 'HOME' | 'LESSON' | 'RESOURCES' | 'CERTIFICATE';
