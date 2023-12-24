"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
}

const Reveal = ({ children, width = "fit-content" }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.1 }}>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={control}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Reveal;
