import React from "react";

interface TrustpilotLogoSVGProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const TrustpilotLogo: React.FC<TrustpilotLogoSVGProps> = ({
  width = 11,
  height = 21,
  fill = "#191919",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 1132.8 278.2"
    width={width}
    height={height}
    xmlSpace="preserve"
  >
    <style type="text/css">
      {`.st0{fill:${fill};}
        .st1{fill:#00B67A;}
        .st2{fill:#005128;}`}
    </style>
    <g id="Type">
      <g>
        <path
          className="st0"
          d="M297.7,98.6h114.7V120h-45.1v120.3h-24.8V120h-44.9V98.6z M407.5,137.7h21.2v19.8h0.4c0.7-2.8,2-5.5,3.9-8.1
            c1.9-2.6,4.2-5.1,6.9-7.2c2.7-2.2,5.7-3.9,9-5.3c3.3-1.3,6.7-2,10.1-2c2.6,0,4.5,0.1,5.5,0.2c1,0.1,2,0.3,3.1,0.4v21.8
            c-1.6-0.3-3.2-0.5-4.9-0.7c-1.7-0.2-3.3-0.3-4.9-0.3c-3.8,0-7.4,0.8-10.8,2.3c-3.4,1.5-6.3,3.8-8.8,6.7c-2.5,3-4.5,6.6-6,11
            c-1.5,4.4-2.2,9.4-2.2,15.1v48.8h-22.6V137.7z..."
        />
      </g>
    </g>
    <g id="Star">
      <polygon
        className="st1"
        points="271.3,98.6 167.7,98.6 135.7,0 103.6,98.6 0,98.5 83.9,159.5 51.8,258 135.7,197.1 219.5,258 187.5,159.5 271.3,98.6 271.3,98.6 271.3,98.6"
      />
      <polygon className="st2" points="194.7,181.8 187.5,159.5 135.7,197.1" />
    </g>
  </svg>
);
