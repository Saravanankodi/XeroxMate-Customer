import * as React from "react";
import type { SVGProps } from "react";
const SvgDoneFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="#059669"
      d="M5 10a5.1 5.1 0 0 0 2.5-.664A5.17 5.17 0 0 0 9.336 7.5 5.06 5.06 0 0 0 10 5q0-1.308-.664-2.5A5.17 5.17 0 0 0 7.5.664 5.1 5.1 0 0 0 5 0a5.1 5.1 0 0 0-2.5.664A5.17 5.17 0 0 0 .664 2.5 5.06 5.06 0 0 0 0 5q0 1.308.664 2.5A5.17 5.17 0 0 0 2.5 9.336Q3.633 9.98 5 10m2.207-5.918-2.5 2.5q-.332.273-.664 0l-1.25-1.25q-.273-.332 0-.664.332-.273.664 0l.918.918 2.168-2.168q.332-.273.664 0 .273.332 0 .664"
    />
  </svg>
);
export default SvgDoneFill;
