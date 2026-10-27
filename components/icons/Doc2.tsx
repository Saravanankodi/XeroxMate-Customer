import * as React from "react";
import type { SVGProps } from "react";
const SvgDoc2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#FB7185"
      fillRule="evenodd"
      d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16c0 1.104-.896 2-2 2H6c-1.104 0-2-.896-2-2zm2 6a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1m1 3a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDoc2;
