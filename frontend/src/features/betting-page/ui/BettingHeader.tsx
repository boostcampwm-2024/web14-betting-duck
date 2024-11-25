function BettingHeader({ content, time }: { content: string; time: number }) {
  return (
    <div className="bg-secondary mb-4 rounded-lg p-3 text-center shadow-inner">
      <h1 className="mb-1 text-xl font-bold">{content}</h1>
      <p className="text-m">{time} 후에 제줄이 마감됩니다</p>
    </div>
  );
}

export { BettingHeader };
