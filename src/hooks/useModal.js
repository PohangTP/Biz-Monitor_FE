import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const ModalContext = createContext(null);

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.15s ease;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 32px;
  width: 100%;
  max-width: ${({ $size }) =>
    $size === 'lg' ? '720px' : $size === 'sm' ? '360px' : '480px'};
  animation: slideUp 0.25s ease;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const ModalProvider = ({ children }) => {
  const [stack, setStack] = useState([]);

  const open = useCallback((render, opts = {}) => {
    const id = Symbol('modal');
    setStack((prev) => [...prev, { id, render, size: opts.size }]);
    return id;
  }, []);

  const close = useCallback((id) => {
    setStack((prev) =>
      id ? prev.filter((m) => m.id !== id) : prev.slice(0, -1)
    );
  }, []);

  useEffect(() => {
    if (stack.length === 0) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stack.length, close]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {stack.map((m) => (
        <Overlay key={String(m.id)} onClick={() => close(m.id)}>
          <ModalBox $size={m.size} onClick={(e) => e.stopPropagation()}>
            {m.render({ close: () => close(m.id) })}
          </ModalBox>
        </Overlay>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside <ModalProvider>');
  return ctx;
};
