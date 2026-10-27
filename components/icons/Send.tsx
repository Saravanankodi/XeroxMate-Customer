import * as React from "react";
import type { SVGProps } from "react";
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M0 13.333V0l15.833 6.667zm1.667-2.5 9.875-4.166L1.667 2.5v2.917l5 1.25-5 1.25zm0 0V2.5v8.333"
    />
  </svg>
);
export default SvgSend;
