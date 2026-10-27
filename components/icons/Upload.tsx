import * as React from "react";
import type { SVGProps } from "react";
const SvgUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path
      stroke="#38BDF8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.474}
      d="M14.842 3.71v14M20.325 9.544l-5.833-5.833-5.834 5.833M24.71 18.553v4.666a2.334 2.334 0 0 1-2.332 2.334H6.044a2.334 2.334 0 0 1-2.333-2.334v-4.666"
    />
  </svg>
);
export default SvgUpload;
