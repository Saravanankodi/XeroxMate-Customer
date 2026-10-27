import * as React from "react";
import type { SVGProps } from "react";
const SvgMailDone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#005AB6"
      d="m11.625 15-3.542-3.542 1.167-1.166 2.375 2.375 4.708-4.709L17.5 9.125zM8.333 5.833 15 1.667H1.667zm0 1.667L1.667 3.333v8.334h4.291l1.667 1.666H1.667q-.688 0-1.177-.49A1.6 1.6 0 0 1 0 11.668v-10Q0 .979.49.49.979 0 1.667 0H15q.687 0 1.177.49.49.489.49 1.177v3.625L15 6.958V3.333zm0 0"
    />
  </svg>
);
export default SvgMailDone;
