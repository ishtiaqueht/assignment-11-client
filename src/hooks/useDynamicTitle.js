import { useEffect } from "react";

export default function useDynamicTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
