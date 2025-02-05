interface LinkedInIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const LinkedInIcon: React.FC<LinkedInIconProps> = ({
  width = 22,
  height = 21,
  fill = "#1F1F1F"
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 21"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.93981 2.19735C4.93981 3.39822 3.97459 4.37126 2.78329 4.37126C1.59198 4.37126 0.626766 3.39822 0.626766 2.19735C0.626766 0.997351 1.59198 0.0234375 2.78329 0.0234375C3.97459 0.0234375 4.93981 0.997351 4.93981 2.19735ZM4.9572 6.11039H0.609375V20.0234H4.9572V6.11039ZM11.8981 6.11039H7.57807V20.0234H11.8989V12.72C11.8989 8.65909 17.1415 8.32692 17.1415 12.72V20.0234H21.4789V11.2139C21.4789 4.3617 13.7207 4.61126 11.8981 7.98431V6.11039Z"
        fill={fill}
      />
    </svg>
  );
};
