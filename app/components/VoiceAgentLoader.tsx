"use client";

import dynamic from "next/dynamic";

const VoiceAgentWidget = dynamic(
  () => import("./VoiceAgent/VoiceAgentWidget"),
  { ssr: false }
);

export default function VoiceAgentLoader() {
  return <VoiceAgentWidget />;
}
