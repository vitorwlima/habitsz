type Props = {
  className?: string;
};

export const Arrow: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      xmlSpace="preserve"
      className={`h-6 w-6 ${className}`}
    >
      <defs></defs>
      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <path
          d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 7 C 24.047 7 7 24.047 7 45 s 17.047 38 38 38 s 38 -17.047 38 -38 S 65.953 7 45 7 z"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 36.522 65.456 c -0.896 0 -1.792 -0.342 -2.475 -1.025 c -1.367 -1.366 -1.367 -3.583 0 -4.949 L 48.528 45 L 34.047 30.519 c -1.367 -1.366 -1.367 -3.583 0 -4.95 c 1.367 -1.366 3.583 -1.365 4.95 0 l 16.955 16.956 c 1.367 1.366 1.367 3.583 0 4.949 L 38.997 64.431 C 38.313 65.114 37.417 65.456 36.522 65.456 z"
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
