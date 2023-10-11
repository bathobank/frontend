import dynamic from "next/dynamic";

export const ReactSelect = dynamic(() => import('react-select'), { ssr: false });
