import { useEffect } from "react";

export const useScript = (
  url: string,
  insertToId?: string,
  timeout?: number,
) => {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");

    script.src = url;
    script.async = true;

    const elementInsert = insertToId
      ? document.querySelector("#" + insertToId)
      : document.body;

    if (!elementInsert) return;

    if (timeout) {
      setTimeout(() => elementInsert.appendChild(script), timeout);
    } else {
      elementInsert.appendChild(script);
    }

    return (): void => {
      if (timeout) {
        setTimeout(() => elementInsert.removeChild(script), timeout + 10);
      } else {
        elementInsert.removeChild(script);
      }
    };
  }, [url, insertToId, timeout]);
};
