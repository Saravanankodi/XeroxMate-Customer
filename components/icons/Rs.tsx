import * as React from "react";
import type { SVGProps } from "react";
const SvgRs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#78350F"
      d="M7.081 16.5.917 10.083V8.25h3.208q1.215 0 2.097-.79A3.23 3.23 0 0 0 7.287 5.5H0V3.667h7.013a3.3 3.3 0 0 0-1.158-1.318 3.03 3.03 0 0 0-1.73-.516H0V0h11v1.833H8.02q.322.39.574.848.252.459.39.986H11V5.5H9.144Q8.96 7.448 7.54 8.766q-1.422 1.317-3.415 1.317H3.46L9.625 16.5z"
    />
  </svg>
);
export default SvgRs;
