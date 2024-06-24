import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <circle
      cx={16}
      cy={9.5}
      r={7.5}
      style={{
        opacity: 1,
        vectorEffect: "none",
        fill: "currentColor",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 2,
        strokeLinecap: "butt",
        strokeLinejoin: "bevel",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeDashoffset: 3.20000005,
        strokeOpacity: 1,
      }}
    />
    <path
      d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z"
      style={{
        opacity: 1,
        vectorEffect: "none",
        fill: "currentColor",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 2,
        strokeLinecap: "butt",
        strokeLinejoin: "bevel",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeDashoffset: 3.20000005,
        strokeOpacity: 1,
      }}
    />
  </svg>
)
export { SvgComponent as UserIcon }
