import * as React from "react";
import type { SVGProps } from "react";
const SvgCancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#94A3B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="m.834 10.833 10-10m-10 0 10 10"
    />
  </svg>
);
export default SvgCancel;
