function MessageList({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full max-h-[600px] min-h-[600px] overflow-y-scroll px-3 py-4">
      <div className="flex flex-col space-y-4">{children}</div>
    </div>
  );
}

export { MessageList };
