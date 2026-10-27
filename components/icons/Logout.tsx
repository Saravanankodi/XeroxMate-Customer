import * as React from "react";
import type { SVGProps } from "react";
const SvgLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#0F172A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M10.666 11.334 13.999 8l-3.333-3.333M14 8H6M6 14H3.333A1.334 1.334 0 0 1 2 12.667V3.333C2 2.597 2.597 2 3.333 2H6"
    />
  </svg>
);
export default SvgLogout;
