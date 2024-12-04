import { useNavigate } from "@tanstack/react-router";

function GlobalErrorComponent({ error, to }: { error?: Error; to: string }) {
  const navigate = useNavigate();
  const isDevelopment = process.env.NODE_ENV === "development";

  const getErrorDetails = () => {
    if (!error) return null;

    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...Object.getOwnPropertyNames(error).reduce(
        (acc, key) => ({
          ...acc,
          [key]: error[key as keyof Error],
        }),
        {},
      ),
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="bg-layout-main absolute left-0 top-0 flex h-full w-full flex-col">
      <div
        className="text-layout-main h-h-full flex flex-col items-center justify-center gap-16 px-8 py-16"
        style={{
          backgroundColor: "oklch(37.92% 0.039 257.29 / 70%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex flex-col items-center">
          <span className="font-bold text-red-500">{errorDetails?.name}</span>
          <span>{errorDetails?.message || ""}</span>
          <h1 className="text-xl font-extrabold">에러가 발생 했습니다!</h1>
        </div>
        <div className="text-layout-main">
          <p>에러가 발생했습니다. 다시 시도해주세요!</p>
        </div>
        <button
          className="text-decoration-none text-layout-main inline-block w-1/2 cursor-pointer rounded-[15px] border border-[rgba(255,255,255,0.1)] bg-[oklch(49.07%_0.2412_292.58/30%)] px-8 py-4 text-[14px] uppercase tracking-[2px] backdrop-blur-[30px]"
          onClick={() => navigate({ to })}
        >
          돌아가기
        </button>
        {isDevelopment && errorDetails?.stack && (
          <div className="text-layout-main w-full flex-1 overflow-auto p-4 text-xl">
            <pre className="whitespace-pre-wrap font-mono">
              {errorDetails.stack.split("\n").map((line, index) => (
                <div key={index} className="py-1 hover:bg-white/10">
                  {line}
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export { GlobalErrorComponent };
