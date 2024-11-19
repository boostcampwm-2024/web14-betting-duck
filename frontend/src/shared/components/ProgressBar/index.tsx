import React from "react";

interface CustomCSSProperties extends React.CSSProperties {
  "--track"?: string;
  "--progress"?: string;
}

interface ProgressBarProps extends React.HTMLAttributes<HTMLProgressElement> {
  value: number;
  uses: "winning" | "losing" | "default";
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
  const trackColor =
    uses === "winning" ? "#D6DEF8" : uses === "losing" ? "#F8D6D6" : "#DDC7FC";
  const progressColor =
    uses === "winning" ? "#4B78F7" : uses === "losing" ? "#DE3390" : "#6D28D9";

  return (
    <label className={rest.className}>
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
