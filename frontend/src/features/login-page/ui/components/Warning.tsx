function Warning({ message }: { message: string }) {
  return <div className="text-md font-extrabold text-red-600">* {message}</div>;
}

export { Warning };
