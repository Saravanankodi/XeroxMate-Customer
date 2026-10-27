import * as React from "react";
import type { SVGProps } from "react";
const SvgCalander = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#444651"
      d="M1.333 13.333q-.55 0-.941-.391A1.28 1.28 0 0 1 0 12V2.667q0-.55.392-.942.391-.392.941-.392H2V0h1.333v1.333h5.334V0H10v1.333h.667q.55 0 .941.392.392.392.392.942V12q0 .55-.392.942a1.28 1.28 0 0 1-.941.391zm0-1.333h9.334V5.333H1.333zm0-8h9.334V2.667H1.333zm0 0V2.667z"
    />
  </svg>
);
export default SvgCalander;
