import * as React from "react";
import type { SVGProps } from "react";
const SvgPrinter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M15.167 5.417v-3.25H6.5v3.25H4.333V0h13v5.417zm-13 2.166H19.5 2.167m15.166 2.709q.461 0 .772-.312.312-.311.312-.772 0-.46-.312-.772a1.05 1.05 0 0 0-.772-.311q-.46 0-.771.311a1.05 1.05 0 0 0-.312.772q0 .461.311.772.312.312.772.312m-2.166 7.041V13H6.5v4.333zm2.166 2.167h-13v-4.333H0v-6.5Q0 7.286.948 6.35q.949-.934 2.302-.934h15.167q1.38 0 2.315.934t.935 2.316v6.5h-4.334zM19.5 13V8.667q0-.461-.311-.772a1.05 1.05 0 0 0-.772-.312H3.25q-.46 0-.772.312a1.05 1.05 0 0 0-.311.772V13h2.166v-2.167h13V13z"
    />
  </svg>
);
export default SvgPrinter;
