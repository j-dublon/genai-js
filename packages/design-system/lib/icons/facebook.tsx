import { JSX } from "react";

// export const FacebookIcon: React.FC<FacebookIconProps> = ({
//   width = 11,
//   height = 21,
//   fill = "#1F1F1F",
// }) => {
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 11 21"
//       fill={fill}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3.10938 6.6901H0.609375V10.0234H3.10938V20.0234H7.27604V10.0234H10.311L10.6094 6.6901H7.27604V5.30094C7.27604 4.5051 7.43604 4.1901 8.20521 4.1901H10.6094V0.0234375H7.43604C4.43938 0.0234375 3.10938 1.3426 3.10938 3.86927V6.6901Z"
//         fill={fill}
//       />
//     </svg>
//   );
// };

export function FacebookIcon(
  width = 11,
  height = 21,
  fill = "#1F1F1F"
): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 21"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.10938 6.6901H0.609375V10.0234H3.10938V20.0234H7.27604V10.0234H10.311L10.6094 6.6901H7.27604V5.30094C7.27604 4.5051 7.43604 4.1901 8.20521 4.1901H10.6094V0.0234375H7.43604C4.43938 0.0234375 3.10938 1.3426 3.10938 3.86927V6.6901Z"
        fill={fill}
      />
    </svg>
  );
}
