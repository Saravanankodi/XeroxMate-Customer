import * as React from "react";
import type { SVGProps } from "react";
const SvgLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    fill="none"
    {...props}
  >
    <path
      fill="#444651"
      d="m2.55 6 3.733 3.733-.95.934L0 5.333 5.333 0l.95.933L2.55 4.667h8.117V6z"
    />
  </svg>
);
export default SvgLeftArrow;
