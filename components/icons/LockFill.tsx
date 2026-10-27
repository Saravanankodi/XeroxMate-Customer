import * as React from "react";
import type { SVGProps } from "react";
const SvgLockFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#4F46E5"
      d="M5.063 5.063V6.75h5.625V5.063q-.035-1.195-.81-2.004-.807-.774-2.003-.809-1.195.035-2.004.809-.773.809-.809 2.003M2.813 6.75V5.063q.071-2.145 1.477-3.586Q5.73.07 7.875 0q2.145.071 3.586 1.477 1.406 1.44 1.476 3.585V6.75h.563q.95.035 1.582.668T15.75 9v6.75q-.035.95-.668 1.582T13.5 18H2.25q-.95-.035-1.582-.668T0 15.75V9q.035-.95.668-1.582T2.25 6.75z"
    />
  </svg>
);
export default SvgLockFill;
