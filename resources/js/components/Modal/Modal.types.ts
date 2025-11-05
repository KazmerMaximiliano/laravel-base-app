export type ModalProps = {
  isOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'primary' | 'danger';
};
