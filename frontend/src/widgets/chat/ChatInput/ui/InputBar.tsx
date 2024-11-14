function InputBar() {
  return (
    <div className="relative flex h-full w-full items-center">
      <pre
        className={`font-nanum-b overflow-wrap-break-word ml-1 flex h-full max-h-[40px] min-h-[20px] w-full resize-none items-center overflow-y-auto whitespace-normal break-words break-all rounded-lg border-none bg-slate-100 px-3 py-2 leading-5 outline-none`}
        contentEditable="true"
      />
    </div>
  );
}

export { InputBar };
