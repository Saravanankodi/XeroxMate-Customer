import * as React from "react";
import type { SVGProps } from "react";
const SvgShiled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#005AB6"
      d="M6 15q-2.606-.656-4.303-2.99T0 6.824V2.25L6 0l6 2.25v4.575q0 2.85-1.697 5.184T6 15m0-1.575q1.82-.563 3.037-2.222A7.4 7.4 0 0 0 10.463 7.5H6V1.594L1.5 3.28v3.881q0 .132.038.338H6z"
    />
  </svg>
);
export default SvgShiled;
