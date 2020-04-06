import React from 'react';

interface LogoProps {
  size?: number;
}

export const Logo = ({ size = 512 }: LogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <g filter="url(#filter0_di)">
        <line
          x1="66.2843"
          y1="270"
          x2="179.421"
          y2="383.137"
          stroke="black"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <line
          x1="378.843"
          y1="128.853"
          x2="435.411"
          y2="185.421"
          stroke="black"
          strokeOpacity="0.5"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <line
          x1="329.345"
          y1="150.066"
          x2="414.198"
          y2="234.919"
          stroke="black"
          strokeOpacity="0.5"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <line
          x1="279.848"
          y1="171.279"
          x2="392.985"
          y2="284.416"
          stroke="black"
          strokeOpacity="0.5"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <line
          x1="180.853"
          y1="383.411"
          x2="435.411"
          y2="128.853"
          stroke="black"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_di"
        x="30"
        y="100.569"
        width="441.696"
        height="327.127"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
      </filter>
      <clipPath id="clip0">
        <rect width="512" height="512" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
