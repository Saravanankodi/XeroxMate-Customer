import * as React from "react";
import type { SVGProps } from "react";
const SvgNewDoc = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#64748B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 6.667v4m0 0-2-2m2 2 2-2M11.335 14H4.667a1.334 1.334 0 0 1-1.333-1.333V3.333C3.334 2.597 3.931 2 4.667 2h3.724c.177 0 .347.07.472.195l3.609 3.61a.67.67 0 0 1 .195.471v6.39c0 .737-.597 1.334-1.333 1.334L8.001 6.667"
    />
  </svg>
);
export default SvgNewDoc;
