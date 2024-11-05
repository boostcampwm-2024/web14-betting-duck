/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const { execSync } = require("child_process");

// 커밋 메시지 파일 경로
const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, "utf-8");

try {
	// 현재 브랜치 이름 가져오기
	const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
		.toString()
		.trim();
	const [commitTitle, ...commitBody] = commitMsg.split("\n");

	const issueMatch = currentBranch.match(/feature\/issue-(\d+)/i);

	if (issueMatch) {
		const issueNumber = issueMatch[1];

		// 이미 #issue 번호가 포함되어 있는지 확인
		if (!commitMsg.includes(`#${issueNumber}`)) {
			// 커밋 메시지 끝에 이슈 번호 추가
			const updatedCommitTitle = `${commitTitle.trim()} #${issueMatch[1]}`;
			const updatedCommitMsg = `${updatedCommitTitle}\n${commitBody
				.join("\n")
				.trim()}`;

			// 새로운 커밋 메시지를 파일에 쓰기
			fs.writeFileSync(commitMsgFile, updatedCommitMsg);
			console.log(
				`이슈 번호 #${issueNumber} 가 commit message에 추가 되었습니다.`,
			);
		}
	}
} catch (error) {
	console.error("Error processing commit message:", error);
	process.exit(1);
}
