import * as React from "react";
import type { SVGProps } from "react";
const SvgNotification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#0F172A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M8.557 17.5a1.667 1.667 0 0 0 2.886 0M2.718 12.772a.833.833 0 0 0 .615 1.395h13.333a.834.834 0 0 0 .617-1.394c-1.109-1.143-2.284-2.357-2.284-6.106 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 3.75-1.175 4.963-2.281 6.105"
    />
  </svg>
);
export default SvgNotification;
