import * as React from "react";
import type { SVGProps } from "react";
const SvgJobFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="#94A3B8"
      d="M3.594.938h2.812q.136.02.157.156v.781H3.438v-.781q.02-.136.156-.157M2.5 1.095v.781H1.25a1.26 1.26 0 0 0-.879.371A1.26 1.26 0 0 0 0 3.125V5h10V3.125a1.26 1.26 0 0 0-.371-.879 1.26 1.26 0 0 0-.879-.371H7.5v-.781a1.17 1.17 0 0 0-.312-.782A1.17 1.17 0 0 0 6.406 0H3.594a1.17 1.17 0 0 0-.781.313q-.294.312-.313.78M10 5.626H6.25v.625a.6.6 0 0 1-.176.45.6.6 0 0 1-.449.175h-1.25a.6.6 0 0 1-.45-.176.6.6 0 0 1-.175-.449v-.625H0v2.5q.02.528.371.879t.879.371h7.5q.528-.02.879-.371T10 8.125z"
    />
  </svg>
);
export default SvgJobFill;
