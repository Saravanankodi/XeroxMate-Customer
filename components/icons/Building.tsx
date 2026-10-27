import * as React from "react";
import type { SVGProps } from "react";
const SvgBuilding = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.667 14V3.333c0-.736-.598-1.333-1.334-1.333H4.667c-.736 0-1.334.597-1.334 1.333V14m9.334 0H14m-1.333 0H9.333m-6 0H2m1.333 0h3.334M6 4.667h.667M6 7.333h.667m2.666-2.666H10m-.667 2.666H10M6.667 14v-3.333c0-.368.298-.667.666-.667h1.334c.368 0 .666.299.666.667V14m-2.666 0h2.666"
    />
  </svg>
);
export default SvgBuilding;
