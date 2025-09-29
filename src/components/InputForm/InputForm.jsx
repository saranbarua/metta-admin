/* eslint-disable react/prop-types */

export default function InputForm({
  label,
  required,
  type,
  placeholder,
  value,
  onChange,
  onInput,
  className,
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-medium mb-1">
        {label}
        <span className="text-red-600">{required}</span>
      </label>
      <div
        className={`relative w-full p-2 border border-gray-300 rounded focus-within:border-blue-500`}
      >
        <input
          required={required}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          onInput={onInput}
          className={`w-full h-full block outline-none`}
        />
      </div>
    </div>
  );
}
