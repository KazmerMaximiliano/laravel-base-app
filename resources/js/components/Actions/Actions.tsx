import { FaPen, FaTrash } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import "./Actions.styles.css";
import { ActionsProps } from "./Actions.types";

export const Actions = ({ onInfo, onEdit, onDelete }: ActionsProps) => {
  return (
    <div className="actions-container">
      {onInfo && (
        <button className="action action--info" onClick={onInfo}>
          <FaCircleInfo />
        </button>
      )}

      {onEdit && (
        <button className="action action--edit" onClick={onEdit}>
          <FaPen />
        </button>
      )}

      {onDelete && (
        <button className="action action--delete" onClick={onDelete}>
          <FaTrash />
        </button>
      )}
    </div>
  );
};
