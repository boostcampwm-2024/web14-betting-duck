import { memo } from "react";

const LogoIcon = memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" fill="none">
      <path
        stroke="url(#a)"
        d="m2.838 7.816 1.457-1.314C5.523 8.28 6.935 9.26 9 9.26c1.806 0 2.953-.612 4.803-2.412 1.017.507 3.08 1.923 3.192 3.527.166 3.542-3.77 5.119-5.76 5.464-1.758.3-5.899.388-8.397-1.66-3.123-2.559-1.457-4.703-.833-5.81.5-.885.764-.737.833-.553Z"
      />
      <path
        stroke="url(#b)"
        d="M13.65 4.773c0 2.325-2.04 4.272-4.636 4.272S4.38 7.098 4.38 4.773 6.419.5 9.014.5s4.636 1.947 4.636 4.273Z"
      />
      <ellipse cx="8.338" cy="5.123" fill="url(#c)" rx=".902" ry=".83" />
      <ellipse cx="12.241" cy="5.123" fill="url(#d)" rx=".555" ry=".83" />
      <path
        fill="url(#e)"
        d="M8.845 6.823c.944-.885 1.597-1.337 1.805-1.452.277-.055.44.023.486.07l1.526.967c.162 0 .347.111-.208.554-.694.553-2.082.622-2.984.553s-1.318-.138-.625-.692"
      />
      <defs>
        <linearGradient
          id="a"
          x1="9"
          x2="9"
          y1="6.502"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBA300" />
          <stop offset="1" stopColor="#E36F00" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="10.245"
          x2="7.813"
          y1=".207"
          y2="9.342"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE58B" />
          <stop offset="1" stopColor="#FBA300" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="8.554"
          x2="8.135"
          y1="4.329"
          y2="5.919"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE58B" />
          <stop offset="1" stopColor="#FBA300" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="12.374"
          x2="11.758"
          y1="4.329"
          y2="5.766"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE58B" />
          <stop offset="1" stopColor="#FBA300" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="11.181"
          x2="10.864"
          y1="5.399"
          y2="7.593"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE58B" />
          <stop offset="1" stopColor="#FBA300" />
        </linearGradient>
      </defs>
    </svg>
  );
});

export { LogoIcon };
