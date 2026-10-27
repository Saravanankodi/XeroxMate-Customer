import * as React from "react";
import type { SVGProps } from "react";
const SvgShopBag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7c0-2.208-1.792-4-4-4S8 4.792 8 7v4M5 9h14l1 12H4zl11 2"
    />
  </svg>
);
export default SvgShopBag;
