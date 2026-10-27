import * as React from "react";
import type { SVGProps } from "react";
const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#94A3B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="m12.666 4.667-.578 8.094A1.333 1.333 0 0 1 10.758 14H5.241c-.7 0-1.28-.54-1.33-1.239l-.578-8.094m3.333 2.666v4m2.667-4v4m.666-6.666v-2A.667.667 0 0 0 9.333 2H6.666a.667.667 0 0 0-.667.667v2m-3.333 0h10.667"
    />
  </svg>
);
export default SvgDelete;
