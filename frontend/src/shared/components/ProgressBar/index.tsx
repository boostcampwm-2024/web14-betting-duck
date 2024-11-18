import React from "react";

interface CustomCSSProperties extends React.CSSProperties {
  "--track"?: string;
  "--progress"?: string;
}

interface ProgressBarProps extends React.HTMLAttributes<HTMLProgressElement> {
  value: number;
  uses: "winning" | "losing";
  max?: number;
  label?: string;
  style?: CustomCSSProperties;
}

function ProgressBar({
  label = "",
  max = 100,
  value,
  uses,
  ...rest
}: ProgressBarProps) {
  const trackColor = uses === "winning" ? "#D6DEF8" : "#FBDDF0";
  const progressColor = uses === "winning" ? "#4B78F7" : "#DE3390";

  return (
    <label>
      <span
        className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden p-0"
        style={{ clip: "rect(1px, 1px, 1px, 1px)", clipPath: "inset(50%)" }}
      >
        {label}
      </span>
      <progress
        aria-describedby={`${label}의 비율`}
        tabIndex={-1}
        className="w-full"
        style={
          {
            "--track": trackColor,
            "--progress": progressColor,
          } as CustomCSSProperties
        }
        value={value}
        max={max}
        {...rest}
      ></progress>
    </label>
  );
}

export { ProgressBar };
