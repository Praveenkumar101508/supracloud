"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00F5FF 0%, #8B5CF6 60%, #00F5FF 100%)",
        boxShadow:  "0 0 8px rgba(0,245,255,0.6)",
      }}
    />
  );
}
