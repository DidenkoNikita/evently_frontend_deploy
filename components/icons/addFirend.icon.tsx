export const AddFriend = (): JSX.Element => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <svg
        width="14"
        height="17"
        viewBox="0 0 14 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="6.86654"
          cy="4.33333"
          r="3.33333"
          stroke="black"
          strokeWidth="2"
        />
        <path
          d="M9.36662 10.1665H4.36662C2.06544 10.1665 0.00419325 12.2914 1.51869 14.0239C2.54861 15.2021 4.25179 15.9998 6.86662 15.9998C9.48145 15.9998 11.1846 15.2021 12.2146 14.0239C13.7291 12.2914 11.6678 10.1665 9.36662 10.1665Z"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <div style={{ marginBottom: '4px', marginLeft: '-2px' }}>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 1L5 9"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1 5H9"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};