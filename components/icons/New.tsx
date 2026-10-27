import * as React from "react";
import type { SVGProps } from "react";
const SvgNew = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#0284C7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="M7 2.333v9.333M11.668 7H2.334"
    />
  </svg>
);
export default SvgNew;
