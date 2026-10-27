import * as React from "react";
import type { SVGProps } from "react";
const SvgThander = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="M7.584 5.833V1.75l-5.25 6.417h4.083v4.083l5.25-6.417z"
    />
  </svg>
);
export default SvgThander;
