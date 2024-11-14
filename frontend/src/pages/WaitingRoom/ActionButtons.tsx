function ActionButtons() {
  return (
    <div className="font-nanum-eb flex flex-row gap-4 px-4 text-xl">
      <button className="bg-secondary-default shadow-medium w-[200px] rounded-lg p-[10px]">
        투표 취소
      </button>
      <button className="bg-default-default text-secondary-default w-full rounded-lg p-[10px]">
        투표 시작
      </button>
    </div>
  );
}

export { ActionButtons };
