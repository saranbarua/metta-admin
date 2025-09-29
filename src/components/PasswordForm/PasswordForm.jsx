import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

/* eslint-disable react/prop-types */
export default function PasswordForm({
  password,
  placeholder,
  className,
  onInput,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`${className} w-full flex items-center input justify-between`}
    >
      <div className="w-full">
        <input
          required
          defaultValue={password}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="outline-none w-full"
          onInput={onInput}
        />
      </div>
      <div className="px-2">
        <button type="button" onClick={togglePasswordVisibility}>
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={showPassword ? faEye : faEyeSlash}
          />
        </button>
      </div>
    </div>
  );
}
