import * as React from "react";
import type { SVGProps } from "react";
const SvgManu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="#005AB6"
      d="M0 10V8.333h10V10zm0-4.167V4.167h15v1.666zm0-4.166V0h15v1.667z"
    />
  </svg>
);
export default SvgManu;
