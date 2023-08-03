export const Friend = (): JSX.Element => {
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
        width="11" 
        height="7" 
        viewBox="0 0 11 7" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M9.44653 1L4.73111 5.71542C4.57423 5.87231 4.31962 5.87153 4.1637 5.71368L1.75 3.27021" 
          stroke="black" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg> 
      </div>
    </div>
  );
};