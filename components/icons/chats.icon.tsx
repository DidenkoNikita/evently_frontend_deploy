import { Props } from "./interface"

export const ChatsIcon = ({ color }: Props): JSX.Element => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0996 21H3.9612C3.57729 21 3.3366 20.5853 3.52708 20.2519L4.7449 17.6317C4.82221 17.4653 4.80129 17.2707 4.69682 17.1199C3.68971 15.6665 3.09961 13.9021 3.09961 12C3.09961 7.02944 7.12905 3 12.0996 3C17.3967 3 21.6236 7.76292 21.0447 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19.0996 18C19.0996 19.6569 17.7565 21 16.0996 21C14.4428 21 13.0996 19.6569 13.0996 18C13.0996 16.3431 14.4428 15 16.0996 15C17.7565 15 19.0996 16.3431 19.0996 18Z"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}