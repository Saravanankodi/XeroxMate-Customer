import * as React from "react";
import type { SVGProps } from "react";
const SvgWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M1.5 12V1.5 12m0 1.5q-.62 0-1.06-.44A1.45 1.45 0 0 1 0 12V1.5Q0 .88.44.44T1.5 0H12q.619 0 1.06.44.44.44.44 1.06v1.875H12V1.5H1.5V12H12v-1.875h1.5V12q0 .619-.44 1.06-.442.44-1.06.44zm6-3q-.619 0-1.06-.44A1.45 1.45 0 0 1 6 9V4.5q0-.618.44-1.06Q6.883 3 7.5 3h5.25q.619 0 1.06.44.44.442.44 1.06V9q0 .619-.44 1.06-.442.44-1.06.44zM12.75 9V4.5H7.5V9zm-3-1.125q.469 0 .797-.328t.328-.797-.328-.797a1.09 1.09 0 0 0-.797-.328q-.468 0-.797.328a1.09 1.09 0 0 0-.328.797q0 .469.328.797.329.328.797.328"
    />
  </svg>
);
export default SvgWallet;
