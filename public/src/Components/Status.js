import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Status = (status, message) => {
  if (status === 'success') {
    return toast.success(message);
  } else if (status === 'error') {
    return toast.error(message);
  } else if (status === 'password mismatch') {
    return toast.error(message);
  }
};
