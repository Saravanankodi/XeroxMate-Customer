import * as React from "react";
import type { SVGProps } from "react";
const SvgEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g
      stroke="#94A3B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      clipPath="url(#Eye_svg__a)"
    >
      <path d="M10 8a2 2 0 0 1-4 0 2 2 0 0 1 4 0" />
      <path d="M1.639 8A6.67 6.67 0 0 1 14.36 8c-.849 2.704-3.376 4.666-8 4.666A6.67 6.67 0 0 1 0 8z" />
    </g>
    <defs>
      <clipPath id="Eye_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgEye;
