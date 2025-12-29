export type ModalProps = {
  isOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'primary' | 'danger';
  onConfirm?: () => void;
  onCancel?: () => void;
};
