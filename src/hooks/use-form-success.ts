"use client";

import { useState, useCallback } from "react";

interface FormSuccessState {
  isOpen: boolean;
  data: Record<string, any>;
}

interface UseFormSuccessOptions {
  onSuccess?: (data: any) => void;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function useFormSuccess(options: UseFormSuccessOptions = {}) {
  const [state, setState] = useState<FormSuccessState>({
    isOpen: false,
    data: {}
  });

  const showSuccess = useCallback((data: Record<string, any> = {}) => {
    setState({ isOpen: true, data });
    options.onSuccess?.(data);

    if (options.autoClose && options.autoCloseDelay) {
      setTimeout(() => {
        setState(prev => ({ ...prev, isOpen: false }));
        options.onClose?.();
      }, options.autoCloseDelay);
    }
  }, [options]);

  const hideSuccess = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
    options.onClose?.();
  }, [options]);

  const reset = useCallback(() => {
    setState({ isOpen: false, data: {} });
  }, []);

  return {
    isOpen: state.isOpen,
    data: state.data,
    showSuccess,
    hideSuccess,
    reset
  };
}