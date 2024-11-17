import { describe, it, expect } from "@jest/globals";

// interface ChannelOption {
//   participants?: number;
//   currentBets: number;
// }

// interface Channel {
//   option1: ChannelOption;
//   option2: ChannelOption;
// }

describe("calculateWinningOdds", () => {
  const calculateWinningOdds = (
    channel,
    winningOption: "option1" | "option2",
  ) => {
    const winningOptionTotalBet =
      winningOption === "option1"
        ? channel.option1.currentBets
        : channel.option2.currentBets;
    const losingOptionTotalBet =
      winningOption === "option1"
        ? channel.option2.currentBets
        : channel.option1.currentBets;
    if (winningOptionTotalBet === 0) {
      return 0;
    }
    return (
      (winningOptionTotalBet + losingOptionTotalBet) / winningOptionTotalBet
    );
  };

  it("두 옵션에 모두 베팅이 되어있는 경우", () => {
    const channel = {
      option1: { currentBets: 100 },
      option2: { currentBets: 200 },
    };
    const result = calculateWinningOdds(channel, "option1");
    expect(result).toBe((100 + 200) / 100);
  });

  it("승리 옵션에 아무도 베팅하지 않은 경우", () => {
    const channel = {
      option1: { currentBets: 0 },
      option2: { currentBets: 200 },
    };
    const result = calculateWinningOdds(channel, "option1");
    expect(result).toBe(0);
  });

  it("패배 옵션에 아무도 베팅하지 않은 경우", () => {
    const channel = {
      option1: { currentBets: 100 },
      option2: { currentBets: 0 },
    };
    const result = calculateWinningOdds(channel, "option1");
    expect(result).toBe((100 + 0) / 100);
  });

  it("두 옵션 모두 베팅하지 않았을 경우", () => {
    const channel = {
      option1: { currentBets: 0 },
      option2: { currentBets: 0 },
    };
    const result = calculateWinningOdds(channel, "option1");
    expect(result).toBe(0);
  });

  it("옵션2가 승리 옵션인 경우 + 타입 소수 확인", () => {
    const channel = {
      option1: { currentBets: 150 },
      option2: { currentBets: 300 },
    };
    const result = calculateWinningOdds(channel, "option2");
    expect(result).toBe((150 + 300) / 300);
    expect(result).toBe(1.5);
  });
});
