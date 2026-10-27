import * as React from "react";
import type { SVGProps } from "react";
const SvgWalletFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#94A3B8"
      d="M2 0Q1.157.03.594.594.032 1.157 0 2v10q.03.844.594 1.406Q1.157 13.97 2 14h12q.844-.03 1.406-.594.563-.563.594-1.406V5q-.03-.843-.594-1.406Q14.843 3.032 14 3H2.5q-.469-.03-.5-.5.031-.469.5-.5H14a.97.97 0 0 0 .719-.281A.97.97 0 0 0 15 1a.97.97 0 0 0-.281-.719A.97.97 0 0 0 14 0zm11 7.5q.438 0 .719.281A.97.97 0 0 1 14 8.5a.97.97 0 0 1-.281.719A.97.97 0 0 1 13 9.5a.97.97 0 0 1-.719-.281A.97.97 0 0 1 12 8.5q0-.437.281-.719A.97.97 0 0 1 13 7.5"
    />
  </svg>
);
export default SvgWalletFill;
