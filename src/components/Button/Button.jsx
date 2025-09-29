/* eslint-disable react/prop-types */

export default function Button({ name, onClick, className, type, disabled }) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
    >
      {name}
    </button>
  );
}
