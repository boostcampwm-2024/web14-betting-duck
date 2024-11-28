interface BettingPool {
  option1: {
    totalAmount: number; // 총 베팅 금액
    participants: number; // 참여자 수
  };
  option2: {
    totalAmount: number;
    participants: number;
  };
}

type BettingSummary = ReturnType<typeof getBettingSummary>;

interface BettingOdds {
  option1Multiplier: number;
  option2Multiplier: number;
  option1ReturnRate: number;
  option2ReturnRate: number;
}

const HOUSE_EDGE = 0;

function calculateOdds(pool: BettingPool): BettingOdds {
  const totalPool = pool.option1.totalAmount + pool.option2.totalAmount;

  const effectivePool = totalPool * (1 - HOUSE_EDGE);

  const option1Ratio =
    pool.option1.totalAmount === 0 ? 0 : pool.option1.totalAmount / totalPool;
  const option2Ratio =
    pool.option2.totalAmount === 0 ? 0 : pool.option2.totalAmount / totalPool;

  const option1Multiplier =
    option1Ratio === 0
      ? 1
      : Math.max(1, effectivePool / pool.option1.totalAmount);

  const option2Multiplier =
    option2Ratio === 0
      ? 1
      : Math.max(1, effectivePool / pool.option2.totalAmount);

  const option1ReturnRate = (option1Multiplier - 1) * 100;
  const option2ReturnRate = (option2Multiplier - 1) * 100;

  return {
    option1Multiplier: Number(option1Multiplier.toFixed(2)),
    option2Multiplier: Number(option2Multiplier.toFixed(2)),
    option1ReturnRate: Number(option1ReturnRate.toFixed(1)),
    option2ReturnRate: Number(option2ReturnRate.toFixed(1)),
  };
}

function calculateWinnings(betAmount: number, multiplier: number): number {
  return Math.floor(betAmount * multiplier);
}

function getBettingSummary(pool: BettingPool) {
  const odds = calculateOdds(pool);
  const totalParticipants =
    pool.option1.participants + pool.option2.participants;
  const totalAmount = pool.option1.totalAmount + pool.option2.totalAmount;

  return {
    totalParticipants,
    totalAmount,
    option1Percentage: (totalAmount === 0
      ? 0
      : (pool.option1.totalAmount / totalAmount) * 100
    ).toFixed(1),
    option2Percentage: (totalAmount === 0
      ? 0
      : (pool.option2.totalAmount / totalAmount) * 100
    ).toFixed(1),
    option1: {
      participants: pool.option1.participants,
      totalAmount: pool.option1.totalAmount,
      multiplier: odds.option1Multiplier,
      returnRate: odds.option1ReturnRate,
    },
    option2: {
      participants: pool.option2.participants,
      totalAmount: pool.option2.totalAmount,
      multiplier: odds.option2Multiplier,
      returnRate: odds.option2ReturnRate,
    },
  };
}

export {
  calculateOdds,
  calculateWinnings,
  getBettingSummary,
  type BettingPool,
  type BettingSummary,
};
