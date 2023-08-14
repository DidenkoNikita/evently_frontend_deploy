import { Props } from "./interface"

export const Acquaintance = ({color}: Props): JSX.Element => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse 
        cx="6.99976" 
        cy="7.94996" 
        rx="3.24" 
        ry="3.24" 
        stroke={color}
        strokeWidth="2"
      />
      <path 
        d="M10.2403 19.2901H3.76026C1.97086 19.2901 0.390774 17.72 1.32359 16.193C2.23568 14.6998 4.00099 13.6201 7.00026 13.6201C9.99953 13.6201 11.7648 14.6998 12.6769 16.193C13.6097 17.72 12.0297 19.2901 10.2403 19.2901Z" 
        stroke={color}
        strokeWidth="2"
      />
      <ellipse 
        cx="16.9998" 
        cy="7.94996" 
        rx="3.24" 
        ry="3.24" 
        stroke={color} 
        strokeWidth="2"
      />
      <path 
        d="M20.2403 19.2901H13.7603C11.9709 19.2901 10.3908 17.72 11.3236 16.193C12.2357 14.6998 14.001 13.6201 17.0003 13.6201C19.9995 13.6201 21.7648 14.6998 22.6769 16.193C23.6097 17.72 22.0297 19.2901 20.2403 19.2901Z" 
        fill={color} 
        stroke={color} 
        strokeWidth="2"
      />
    </svg>
  )
}