import * as React from "react";
import type { SVGProps } from "react";
const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#131B2E"
      d="M1.5 12h2.25V7.5h4.5V12h2.25V5.25L6 1.875 1.5 5.25zM0 13.5v-9L6 0l6 4.5v9H6.75V9h-1.5v4.5zm6-6.562"
    />
  </svg>
);
export default SvgHome;
