import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure toast container (you can customize these options)
// toast.configure({
//     autoClose: 5000, // Duration for which each toast is displayed
//     position: 'top-right', // Position of the toast notifications
// });

const useToast = () => {
    const showToast = (message, options = {}) => {
        toast(message, options);
    };

    const showErrorToast = (message, options = {}) => {
        toast.error(message, options);
    };

    const showSuccessToast = (message, options = {}) => {
        toast.success(message, options);
    };

    const showInfoToast = (message, options = {}) => {
        toast.info(message, options);
    };

    const showWarningToast = (message, options = {}) => {
        toast.warning(message, options);
    };

    return {
        showToast,
        showErrorToast,
        showSuccessToast,
        showInfoToast,
        showWarningToast,
    };
};

export default useToast;
