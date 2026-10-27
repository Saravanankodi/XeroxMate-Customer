import * as React from "react";
import type { SVGProps } from "react";
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#2563EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M2.666 10.667v.667c0 1.104.896 2 2 2h6.667c1.104 0 2-.896 2-2v-.667M10.666 8l-2.667 2.667m0 0L5.333 8m2.666 2.667v-8"
    />
  </svg>
);
export default SvgDownload;
