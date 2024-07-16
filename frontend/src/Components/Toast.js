import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import '../Styles/Toast.css';

const activeMessages = new Set();

const Toast = ({ message, visible }) => (
  <div className={`custom-toast ${!visible ? 'leave' : ''}`}>
    {message}
  </div>
);

export const showToast = (message, duration=2000) => {
  if (activeMessages.has(message)) return;

  const ToastWrapper = ({ id, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      activeMessages.add(message);

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          toast.dismiss(id);
          activeMessages.delete(message);
        }, 500);
      }, duration);

      return () => {
        clearTimeout(timer);
        activeMessages.delete(message);
      };
    }, [id, message]);

    return <Toast message={message} visible={visible} />;
  };

  toast.custom((t) => <ToastWrapper id={t.id} message={message} />, {
    position: 'top-center',
  });
};
