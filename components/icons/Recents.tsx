import * as React from "react";
import type { SVGProps } from "react";
const SvgRecents = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#005AB6"
      d="M7.5 15q-2.875 0-5.01-1.906Q.354 11.187.042 8.334H1.75q.292 2.166 1.927 3.583 1.636 1.416 3.823 1.416 2.438 0 4.135-1.698 1.698-1.697 1.698-4.135t-1.698-4.135T7.5 1.667q-1.437 0-2.687.666a6.2 6.2 0 0 0-2.105 1.834H5v1.666H0v-5h1.667v1.959A7.3 7.3 0 0 1 4.26.729Q5.791 0 7.5 0q1.563 0 2.927.594t2.375 1.604a7.6 7.6 0 0 1 1.604 2.375Q15 5.937 15 7.5a7.3 7.3 0 0 1-.594 2.927 7.6 7.6 0 0 1-1.604 2.375 7.6 7.6 0 0 1-2.375 1.604A7.3 7.3 0 0 1 7.5 15m2.333-4L6.667 7.833v-4.5h1.666v3.834L11 9.833z"
    />
  </svg>
);
export default SvgRecents;
