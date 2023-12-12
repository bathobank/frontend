import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLOrSVGElement> & { size?: number };

export const LoadingIcon = ({ size = 32, ...rest }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...rest}
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        strokeWidth="9"
        stroke="#353535"
        strokeDasharray="69.11503837897544 69.11503837897544"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="34"
        strokeWidth="9"
        stroke="#666666"
        strokeDasharray="53.40707511102649 53.40707511102649"
        strokeDashoffset="53.40707511102649"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;-360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};
