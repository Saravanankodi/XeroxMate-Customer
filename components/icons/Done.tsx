import * as React from "react";
import type { SVGProps } from "react";
const SvgDone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={9}
    fill="none"
    {...props}
  >
    <path
      fill="#10B981"
      d="M12.004.246a.9.9 0 0 1 .246.629.9.9 0 0 1-.246.629l-7 7a.91.91 0 0 1-.629.246.91.91 0 0 1-.629-.246l-3.5-3.5A.91.91 0 0 1 0 4.375q0-.356.246-.629A.91.91 0 0 1 .875 3.5q.356 0 .629.246l2.871 2.899L10.746.246A.91.91 0 0 1 11.375 0q.356 0 .629.246"
    />
  </svg>
);
export default SvgDone;
