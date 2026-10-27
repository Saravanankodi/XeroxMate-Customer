import * as React from "react";
import type { SVGProps } from "react";
const SvgMail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#005AB6"
      d="M1.667 13.333q-.688 0-1.177-.49A1.6 1.6 0 0 1 0 11.668v-10Q0 .979.49.49.979 0 1.667 0H15q.687 0 1.177.49.49.489.49 1.177v10q0 .687-.49 1.177t-1.177.49zM8.333 7.5 1.667 3.333v8.334H15V3.333zm0-1.667L15 1.667H1.667zm-6.666-2.5V1.667zv8.334z"
    />
  </svg>
);
export default SvgMail;
