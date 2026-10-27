import * as React from "react";
import type { SVGProps } from "react";
const SvgNewFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      stroke="#0284C7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.1}
      d="M8.167 24.5h11.667a2.334 2.334 0 0 0 2.333-2.333V10.983c0-.31-.123-.606-.341-.825l-6.317-6.316a1.17 1.17 0 0 0-.825-.342H8.167a2.334 2.334 0 0 0-2.333 2.333v16.334A2.334 2.334 0 0 0 8.167 24.5"
    />
    <path
      stroke="#0284C7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.1}
      d="M15.166 4.083V10.5h6.417"
    />
    <path
      stroke="#0284C7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M10.5 15.167h7m-7 4.667h4.667"
    />
  </svg>
);
export default SvgNewFile;
