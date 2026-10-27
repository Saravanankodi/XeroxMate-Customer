import * as React from "react";
import type { SVGProps } from "react";
const SvgClould = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#001B3F"
      d="M5.5 16q-2.275 0-3.887-1.575T0 10.575Q0 8.625 1.175 7.1 2.349 5.575 4.25 5.15q.625-2.3 2.5-3.725T11 0q2.925 0 4.963 2.038Q18 4.075 18 7q1.725.2 2.863 1.488A4.4 4.4 0 0 1 22 11.5q0 1.875-1.312 3.188Q19.375 16 17.5 16H12q-.825 0-1.412-.588A1.93 1.93 0 0 1 10 14V8.85L8.4 10.4 7 9l4-4 4 4-1.4 1.4L12 8.85V14h5.5q1.05 0 1.775-.725T20 11.5t-.725-1.775T17.5 9H16V7q0-2.074-1.463-3.537T11 2Q8.925 2 7.463 3.463 6 4.925 6 7h-.5Q4.05 7 3.025 8.025A3.37 3.37 0 0 0 2 10.5q0 1.45 1.025 2.475A3.37 3.37 0 0 0 5.5 14H8v2zM11 9"
    />
  </svg>
);
export default SvgClould;
