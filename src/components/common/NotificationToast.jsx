import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@/hooks/useTheme';

export function NotificationToast() {
  const { resolvedTheme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2600}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      toastClassName="!rounded-xl !font-sans !text-sm !shadow-lg"
    />
  );
}

export default NotificationToast;