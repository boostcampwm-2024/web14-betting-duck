function GlobalErrorComponent({
  error,
  reset,
}: {
  error?: Error;
  reset: () => void;
}) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="bg-layout-main relative flex h-full w-full flex-col justify-end pt-4">
      <div
        className="text-layout-main absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-16 px-8"
        style={{
          backgroundColor: "oklch(37.92% 0.039 257.29 / 70%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col items-center">
          <span>{error ? error.message : ""}</span>
          <h1 className="text-xl font-extrabold">에러가 발생 했습니다!</h1>
        </div>
        <div className="text-layout-main pt-16">
          <p>에러가 발생했습니다. 다시 시도해주세요!</p>
        </div>
        <button
          className="text-decoration-none text-layout-main inline-block w-1/2 cursor-pointer rounded-[15px] border border-[rgba(255,255,255,0.1)] bg-[oklch(49.07%_0.2412_292.58/30%)] px-8 py-4 text-[14px] uppercase tracking-[2px] backdrop-blur-[30px]"
          onClick={reset}
        >
          돌아가기
        </button>
      </div>
      {isDevelopment && error?.stack && (
        <div className="h-full w-full overflow-auto bg-black/80 p-4 text-sm text-white">
          <pre className="whitespace-pre-wrap font-mono">
            {error.stack.split("\n").map((line, index) => (
              <div key={index} className="py-1 hover:bg-white/10">
                {line}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}

export { GlobalErrorComponent };
