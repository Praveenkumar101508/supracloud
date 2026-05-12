"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AIStateType = {
  isBooted: boolean;
  agentSpeaking: boolean;
  agentListening: boolean;
  currentIntent: string | null;
  setBooted: (v: boolean) => void;
  setAgentSpeaking: (v: boolean) => void;
  setAgentListening: (v: boolean) => void;
  setCurrentIntent: (v: string | null) => void;
};

const AIStateCtx = createContext<AIStateType>({
  isBooted: false,
  agentSpeaking: false,
  agentListening: false,
  currentIntent: null,
  setBooted: () => {},
  setAgentSpeaking: () => {},
  setAgentListening: () => {},
  setCurrentIntent: () => {},
});

export function AIStateProvider({ children }: { children: ReactNode }) {
  const [isBooted, setBooted] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [agentListening, setAgentListening] = useState(false);
  const [currentIntent, setCurrentIntent] = useState<string | null>(null);

  return (
    <AIStateCtx.Provider value={{
      isBooted, agentSpeaking, agentListening, currentIntent,
      setBooted, setAgentSpeaking, setAgentListening, setCurrentIntent,
    }}>
      {children}
    </AIStateCtx.Provider>
  );
}

export const useAIState = () => useContext(AIStateCtx);
