import * as React from "react";
import type { SVGProps } from "react";
const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentcolor"
      d="M6 7.5q.619 0 1.06-.44.44-.44.44-1.06 0-.618-.44-1.06A1.44 1.44 0 0 0 6 4.5q-.618 0-1.06.44Q4.5 5.383 4.5 6t.44 1.06q.442.44 1.06.44m0 5.512q2.287-2.1 3.394-3.815Q10.5 7.48 10.5 6.15q0-2.044-1.303-3.347T6 1.5 2.803 2.803 1.5 6.15q0 1.33 1.106 3.047Q3.713 10.913 6 13.013M6 15q-3.02-2.569-4.51-4.772T0 6.15q0-2.813 1.81-4.481Q3.617-.001 6 0q2.381 0 4.19 1.669Q12 3.337 12 6.15q0 1.876-1.49 4.078Q9.017 12.432 6 15m0-9"
    />
  </svg>
);
export default SvgLocation;
