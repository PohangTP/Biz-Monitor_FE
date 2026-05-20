import { createContext, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

const ToastContext = createContext(null);

const ToastWrap = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid
    ${({ $variant, theme }) =>
      $variant === 'error'
        ? theme.colors.danger
        : $variant === 'warn'
          ? theme.colors.gold
          : theme.colors.success};
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideInRight 0.3s ease;
  max-width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

let nextId = 1;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message, opts = {}) => {
      const id = nextId++;
      const variant = opts.variant ?? 'success';
      const duration = opts.duration ?? 2500;
      setToasts((prev) => [...prev, { id, message, variant }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  const api = {
    show,
    success: (m, opts) => show(m, { ...opts, variant: 'success' }),
    error: (m, opts) => show(m, { ...opts, variant: 'error' }),
    warn: (m, opts) => show(m, { ...opts, variant: 'warn' }),
    dismiss,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastWrap>
        {toasts.map((t) => (
          <ToastItem key={t.id} $variant={t.variant}>
            {t.message}
          </ToastItem>
        ))}
      </ToastWrap>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
};
