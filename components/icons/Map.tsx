import * as React from "react";
import type { SVGProps } from "react";
const SvgMap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#64748B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="m5.25 11.666-3.177-1.589a.58.58 0 0 1-.323-.521v-6.28a.583.583 0 0 1 .844-.52L5.25 4.082m0 7.583 3.5-1.75m-3.5 1.75V4.083m3.5 5.833 2.656 1.328a.584.584 0 0 0 .844-.521v-6.28a.58.58 0 0 0-.323-.521L8.75 2.333m0 7.583V2.333m0 0-3.5 1.75"
    />
  </svg>
);
export default SvgMap;
