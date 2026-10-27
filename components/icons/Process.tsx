import * as React from "react";
import type { SVGProps } from "react";
const SvgProcess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#005AB6"
      d="M6.75 14.925a7.5 7.5 0 0 1-4.79-2.41A7.7 7.7 0 0 1 .524 10.22 7.3 7.3 0 0 1 0 7.463q0-1.707.684-3.15A7.5 7.5 0 0 1 2.55 1.838H.75v-1.5h4.5v4.5h-1.5V2.794a6.1 6.1 0 0 0-1.64 2.034 5.8 5.8 0 0 0-.61 2.635q0 2.306 1.51 3.984t3.74 1.96zm-.319-4.013L3.263 7.726l1.05-1.05L6.43 8.794l4.257-4.257 1.05 1.07zm3.319 3.675v-4.5h1.5v2.044a6.3 6.3 0 0 0 1.64-2.043q.61-1.2.61-2.625 0-2.307-1.51-3.985-1.508-1.678-3.74-1.96V0q2.85.282 4.8 2.4Q15 4.519 15 7.463q0 1.706-.684 3.15a7.5 7.5 0 0 1-1.866 2.475h1.8v1.5z"
    />
  </svg>
);
export default SvgProcess;
