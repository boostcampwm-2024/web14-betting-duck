import React, { useState, useEffect } from "react";

interface DuckCoinIconProps {
  width: number;
  height: number;
}

interface AnimatedDigitProps {
  digit: string;
  shouldAnimate: boolean;
}

interface AnimatedDuckCountProps {
  value: number;
  DuckCoinIcon: React.ComponentType<DuckCoinIconProps>;
}

const AnimatedDigit: React.FC<AnimatedDigitProps> = ({
  digit,
  shouldAnimate,
}) => {
  return (
    <span
      className="inline-block"
      style={{
        animation: shouldAnimate ? "slideIn3D 500ms ease-in-out" : "none",
      }}
    >
      {digit}
    </span>
  );
};

const AnimatedDuckCount: React.FC<AnimatedDuckCountProps> = ({
  value,
  DuckCoinIcon,
}) => {
  const [prevValue, setPrevValue] = useState<number>(value);
  const [animatingDigits, setAnimatingDigits] = useState<Set<number>>(
    new Set(),
  );

  // 숫자를 자릿수 배열로 변환
  const getDigits = (num: number): string[] => {
    return num.toString().padStart(4, "0").split("");
  };

  useEffect(() => {
    if (value !== prevValue) {
      // 변경된 자릿수 확인
      const prevDigits = getDigits(prevValue);
      const newDigits = getDigits(value);
      const changedPositions = new Set<number>();

      // 끝에서부터 비교하여 변경된 자릿수 확인
      for (let i = newDigits.length - 1; i >= 0; i--) {
        if (prevDigits[i] !== newDigits[i]) {
          changedPositions.add(i);
          // 현재 자릿수가 변경되면 그 앞의 자릿수도 모두 변경된 것으로 처리
          if (i < newDigits.length - 1) {
            changedPositions.add(i + 1);
          }
        }
      }

      setAnimatingDigits(changedPositions);

      // 애니메이션 종료 후 상태 초기화
      const timer = setTimeout(() => {
        setAnimatingDigits(new Set());
        setPrevValue(value);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const digits = getDigits(value);

  return (
    <div className="z-20 flex w-full items-center justify-center gap-4">
      <DuckCoinIcon width={32} height={32} />
      <div className="flex text-2xl font-bold">
        {digits.map((digit, index) => (
          <AnimatedDigit
            key={`${index}-${digit}`}
            digit={digit}
            shouldAnimate={animatingDigits.has(index)}
          />
        ))}
      </div>
    </div>
  );
};

export { AnimatedDuckCount };
