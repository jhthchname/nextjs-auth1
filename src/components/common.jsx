import { useRef, useCallback } from "react";
import toast from "react-hot-toast";

export const ManageToast = () => {
  const hasShownToastRef = useRef(false);

  const showToast = useCallback((message) => {
    if (!hasShownToastRef.current) {
      toast.success(message);
      hasShownToastRef.current = true;
    }
  }, []);

  return { hasShownToastRef, showToast };
};
