import * as React from "react";
import type { SVGProps } from "react";
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill="#F59E0B"
      d="m2.55 12.667 1.083-4.684L0 4.833l4.8-.416L6.667 0l1.866 4.417 4.8.416L9.7 7.983l1.083 4.684-4.116-2.484z"
    />
  </svg>
);
export default SvgStar;
