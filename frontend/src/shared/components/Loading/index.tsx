import { motion } from "framer-motion";

function LoadingAnimation() {
  const circles = [
    {
      cx: 70,
      cy: "50%",
      r: "1.25cqh",
      fill: "#8F76FF",
    },
    {
      cx: 170,
      cy: "50%",
      r: "1.25cqh",
      fill: "#FF7E76",
    },
    { cx: 270, cy: "50%", r: "1.25cqh", fill: "#8F76FF" },
    {
      cx: 370,
      cy: "50%",
      r: "1.25cqh",
      fill: "#98DF9F",
    },
    {
      cx: 470,
      cy: "50%",
      r: "1.25cqh",
      fill: "#8F76FF",
    },
  ];

  return (
    <motion.svg
      width="556"
      height="120"
      viewBox="0 0 556 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        "bg-layout-main flex h-full w-full items-center justify-center px-2 pb-12"
      }
    >
      {circles.map((circle, index) => {
        const startY = 10 - 7.5;
        const endY = 7.5 + 13;

        return (
          <motion.circle
            key={index}
            cx={`calc(${circle.cx}px + (${circle.r} / 2))`}
            cy={circle.cy}
            r={circle.r}
            fill={circle.fill}
            initial={{ transform: `translateY(${startY}px)` }}
            animate={{ transform: `translateY(${endY}px)` }}
            transition={{
              delay: 200 * Math.sin(0.001 * index),
              duration: 10,
              type: "spring",
              damping: 9,
              stiffness: 120,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.001,
            }}
          />
        );
      })}
    </motion.svg>
  );
}

export { LoadingAnimation };
