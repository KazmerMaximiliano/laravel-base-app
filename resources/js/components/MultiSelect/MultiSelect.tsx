import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import "./MultiSelect.styles.css";
import { MultiSelectProps } from "./MultiSelect.types";

export const MultiSelect = ({
  name,
  placeholder,
  error,
  options,
  defaultValue = [],
  onChange,
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const handleRemoveTag = (valueToRemove: string) => {
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const selectedLabels = selectedValues.map(
    (value) => options.find((option) => option.value === value)?.label || value,
  );

  return (
    <div className="multiselect-wrapper" ref={containerRef}>
      {selectedValues.map((value, index) => (
        <input
          key={index}
          type="hidden"
          name={`${name}[${index}]`}
          value={value}
        />
      ))}

      <div className="multiselect-container">
        <div
          className="multiselect"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
        >
          {selectedValues.length === 0 ? (
            <span className="multiselect-placeholder">{placeholder}</span>
          ) : (
            selectedLabels.map((label, index) => (
              <span key={index} className="multiselect-tag">
                {label}
                <span
                  className="multiselect-tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(selectedValues[index]);
                  }}
                >
                  ×
                </span>
              </span>
            ))
          )}
        </div>

        {isOpen && (
          <div className="multiselect-dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className="multiselect-option"
                onClick={() => handleToggleOption(option.value)}
              >
                <Checkbox
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleToggleOption(option.value)}
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="multiselect-error">{error}</div>
    </div>
  );
};
