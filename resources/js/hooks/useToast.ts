import { Slide, toast, ToastPosition } from 'react-toastify';

interface ToastOptions {
  type: 'info' | 'success' | 'warning' | 'error' | 'default';
  message: string;
}

export const useToast = ({ type, message }: ToastOptions) => {
  let toastConfig = {
    position: "bottom-center" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    theme: "light",
    transition: Slide,
  }

  switch (type) {
    case 'info':
      toast.info(message, toastConfig);
      break;
    case 'success':
      toast.success(message, toastConfig);
      break;
    case 'warning':
      toast.warning(message, toastConfig);
      break;
    case 'error':
      toast.error(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
      break;
  }
}
