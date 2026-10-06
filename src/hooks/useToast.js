import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_HIDE_MS = 3000;

// Un solo toast a la vez: mostrar otro reemplaza el mensaje y reinicia el temporizador.
export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  const show = useCallback((message) => {
    clearTimeout(timerRef.current);
    setToast({ message });
    timerRef.current = setTimeout(() => setToast(null), AUTO_HIDE_MS);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toast, show, dismiss };
}
