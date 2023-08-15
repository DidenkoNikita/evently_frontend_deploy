import { Props } from "./interface";

export const ProfileIcon = ({ color }: Props): JSX.Element => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="12.7"
        cy="6.97733"
        rx="3.9773"
        ry="3.97733"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M15.6832 13.9375H9.71722C6.97146 13.9375 4.51201 16.4729 6.31909 18.5402C7.54798 19.946 9.58021 20.8978 12.7002 20.8978C15.8202 20.8978 17.8524 19.946 19.0813 18.5402C20.8884 16.4729 18.4289 13.9375 15.6832 13.9375Z"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}