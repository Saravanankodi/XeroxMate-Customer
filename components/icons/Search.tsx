import * as React from "react";
import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#757682"
      d="m13.833 15-5.25-5.25a5.08 5.08 0 0 1-3.167 1.083q-2.27 0-3.843-1.573T0 5.417t1.573-3.844T5.417 0 9.26 1.573t1.573 3.844A5.08 5.08 0 0 1 9.75 8.583l5.25 5.25zM5.417 9.167q1.562 0 2.656-1.094t1.094-2.656T8.073 2.76Q6.978 1.667 5.417 1.667T2.76 2.76Q1.667 3.855 1.667 5.417T2.76 8.073t2.657 1.094"
    />
  </svg>
);
export default SvgSearch;
