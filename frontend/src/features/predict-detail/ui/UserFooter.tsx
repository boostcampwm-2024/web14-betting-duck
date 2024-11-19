function UserFooter() {
  return (
    <div className="flex w-full items-center justify-around gap-4">
      <button className="bg-default text-layout-main w-full rounded-lg px-4 py-2 text-lg font-extrabold">
        마이페이지로 돌아가기
      </button>
      <button className="bg-default text-layout-main w-full rounded-lg px-4 py-2 text-lg font-extrabold">
        방 생성하러 가기
      </button>
    </div>
  );
}

export { UserFooter };
