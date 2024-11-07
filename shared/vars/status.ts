export const STATUS_CODE = ["200", "204", "400", "401", "409", "500"] as const;
export const STATUS_MESSAGE = [
	"OK",
	"입력 오류(ID 중복검사, 로그인 등)",
	"올바르지 않은 형식입니다.",
	"토큰 만료",
	"이미 등록된 이메일입니다.",
	"DB에러(데이터 x, 서버 error)",
] as const;

export const STATUS_MAP = STATUS_CODE.reduce(
	(acc, code, index) => {
		acc[code] = STATUS_MESSAGE[index];
		return acc;
	},
	{} as Record<(typeof STATUS_CODE)[number], (typeof STATUS_MESSAGE)[number]>,
);

export type StatusCode = typeof STATUS_CODE;
export type StatusMessage = typeof STATUS_MESSAGE;
export type StatusMap = typeof STATUS_MAP;
