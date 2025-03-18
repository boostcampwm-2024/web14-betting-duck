import { memo } from "react";

const PeoplesIcon = memo(({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      {...props}
    >
      <g clip-path="url(#a)">
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          clip-path="url(#b)"
        >
          <path
            strokeWidth="2"
            d="M17.15 21.125v-1.917a3.75 3.75 0 0 0-1.172-2.71 4.1 4.1 0 0 0-2.828-1.123h-8a4.1 4.1 0 0 0-2.829 1.123 3.75 3.75 0 0 0-1.171 2.71v1.917M9.15 11.542c2.209 0 4-1.717 4-3.834s-1.791-3.833-4-3.833-4 1.716-4 3.833 1.79 3.834 4 3.834"
          />
          <path
            strokeWidth="1.5"
            d="M23.15 21.125v-1.917c0-.849-.296-1.674-.839-2.345A4 4 0 0 0 20.15 15.5M16.15 4c.86.21 1.623.69 2.168 1.363.544.672.84 1.499.84 2.35s-.296 1.678-.84 2.35a4 4 0 0 1-2.168 1.364"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path d="M.15 0h24v24h-24z" />
        </clipPath>
        <clipPath id="b">
          <path d="M.15 1h24v23h-24z" />
        </clipPath>
      </defs>
    </svg>
  );
});

export { PeoplesIcon };
