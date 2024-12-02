import { describe, it, expect } from "@jest/globals";

interface ChannelOption {
  participants?: number;
  currentBets: number;
}

interface Channel {
  option1: ChannelOption;
  option2: ChannelOption;
}

describe("calculateWinningOdds", () => {
  const calculateWinningOdds = (
    channel: Channel,
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

describe("calculateSettledDuckCoins", () => {
  const calculateSettledDuckCoins = (
    betAmount: number,
    selectedOption: string,
    winningOption: string,
    winningOdds: number,
  ) => {
    const duck = 300;
    const isWinner = selectedOption === winningOption;
    const duckChange = isWinner ? betAmount * winningOdds : 0;
    const updatedDuck = duck ? duck + duckChange : duckChange;
    return Math.round(updatedDuck);
  };

  it("정수 잘나오는지?", () => {
    const betAmount = 50;
    const selectedOption = "option1";
    const winningOption = "option1";
    const winningOdds = 1.2;

    const updatedDuck = calculateSettledDuckCoins(
      betAmount,
      selectedOption,
      winningOption,
      winningOdds,
    );

    expect(updatedDuck).toBe(300 + 50 * 1.2);
  });

  it("반올림 테스트(내림)", () => {
    const betAmount = 10;
    const selectedOption = "option1";
    const winningOption = "option1";
    const winningOdds = 1.11;

    const updatedDuck = calculateSettledDuckCoins(
      betAmount,
      selectedOption,
      winningOption,
      winningOdds,
    );

    expect(updatedDuck).toBe(300 + 10 * 1.1);
  });

  it("반올림 테스트(올림)", () => {
    const betAmount = 10;
    const selectedOption = "option1";
    const winningOption = "option1";
    const winningOdds = 1.99;

    const updatedDuck = calculateSettledDuckCoins(
      betAmount,
      selectedOption,
      winningOption,
      winningOdds,
    );

    expect(updatedDuck).toBe(300 + 10 * 2);
  });
});
