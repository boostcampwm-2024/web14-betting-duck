function TimerIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 2.6V5L6.6 5.8M9 5C9 7.20914 7.20914 9 5 9C2.79086 9 1 7.20914 1 5C1 2.79086 2.79086 1 5 1C7.20914 1 9 2.79086 9 5Z"
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { TimerIcon };
