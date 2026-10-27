import * as React from "react";
import type { SVGProps } from "react";
const SvgQrCode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentcolor"
      d="M7.5 13.5V12H9v1.5zM6 12V8.25h1.5V12zm6-2.25v-3h1.5v3zm-1.5-3v-1.5H12v1.5zm-9 1.5v-1.5H3v1.5zM0 6.75v-1.5h1.5v1.5zM6.75 1.5V0h1.5v1.5zM1.125 3.375h2.25v-2.25h-2.25zM0 4.5V0h4.5v4.5zm1.125 7.875h2.25v-2.25h-2.25zM0 13.5V9h4.5v4.5zM10.125 3.375h2.25v-2.25h-2.25zM9 4.5V0h4.5v4.5zm1.5 9v-2.25H9v-1.5h3V12h1.5v1.5zm-3-5.25v-1.5h3v1.5zm-3 0v-1.5H3v-1.5h4.5v1.5H6v1.5zm.75-3.75v-3h1.5V3h1.5v1.5zM1.688 2.813V1.687h1.125v1.126zm0 9v-1.126h1.126v1.126zm9-9V1.687h1.126v1.126z"
    />
  </svg>
);
export default SvgQrCode;
