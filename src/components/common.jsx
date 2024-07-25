import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export const ManageToast = () => {
  const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false);

  const showToast = useCallback(
    (message, type = "success") => {
      if (type === "success") {
        if (!hasShownSuccessToast) {
          toast.success(message);
          setHasShownSuccessToast(true);
        }
      } else if (type === "error") {
        toast.error(message);
      } else {
        toast(message);
      }
    },
    [hasShownSuccessToast]
  );

  const resetSuccessToast = useCallback(() => {
    setHasShownSuccessToast(false);
  }, []);

  return { showToast, resetSuccessToast };
};
