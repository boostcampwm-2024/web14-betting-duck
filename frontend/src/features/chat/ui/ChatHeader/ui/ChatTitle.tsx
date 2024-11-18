function ChartTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-secondary-default font-nanum-r text-xs">
        승부 예측 주제
      </span>
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}

export { ChartTitle };
