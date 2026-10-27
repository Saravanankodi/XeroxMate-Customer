import * as React from "react";
import type { SVGProps } from "react";
const SvgFolder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#94A3B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="M4.667 4.083V1.75m4.666 2.333V1.75m-5.25 4.667h5.834m-7 5.833h8.166c.644 0 1.167-.523 1.167-1.167v-7c0-.644-.523-1.166-1.167-1.166H2.917c-.644 0-1.167.522-1.167 1.166v7c0 .644.523 1.167 1.167 1.167l1.75-8.167"
    />
  </svg>
);
export default SvgFolder;
