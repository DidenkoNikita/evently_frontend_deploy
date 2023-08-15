interface Color {
  color: string;
}

export const City = ({ color }: Color): JSX.Element => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8.36364C15 14.0909 8 19 8 19C8 19 1 14.0909 1 8.36364C1 6.41068 1.7375 4.53771 3.05025 3.15676C4.36301 1.77581 6.14348 1 8 1C9.85652 1 11.637 1.77581 12.9497 3.15676C14.2625 4.53771 15 6.41068 15 8.36364Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}