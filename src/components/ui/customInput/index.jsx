import { FormControl, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import Eye from "../../../assets/icons/Eye.svg?react";
import EyeSlash from "../../../assets/icons/EyeSlash.svg?react";
const CustomInput = ({
  label,
  name,
  width = "100%",
  minWidth,
  height = "44px",
  placeholder,
  error = false,
  onChange,
  value,
  borderRadius = "8px",
  backgroundColor = "transparent",
  center = false,
  borderDisplay = false,
  disabled = false,
  onlyRead = false,
  marginTop,
  type = "text",
  endAdornment,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    const syntheticEvent = {
      target: {
        value: value,
      },
    };
    onChange?.(syntheticEvent);
  };
  const inputProps = {
    endAdornment:
      type === "password" ? (
        <IconButton onClick={() => setShow(!show)}>
          {show ? <Eye /> : <EyeSlash />}
        </IconButton>
      ) : (
        endAdornment && (
          <IconButton sx={{ cursor: "auto" }}>{endAdornment}</IconButton>
        )
      ),
    readOnly: onlyRead,
  };
  return (
    <FormControl sx={{ width, marginTop, minWidth: minWidth }}>
      {label ? (
        <label className={`${center ? "text-center" : ""}`}>{label}</label>
      ) : (
        ""
      )}
      <TextField
        height={height}
        id={label}
        name={name}
        value={value || ""}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        type={show ? "text" : type}
        onChange={handleInputChange}
        InputProps={inputProps}
        sx={{
          "& .MuiInputBase-root": {
            height,
            width,
            borderRadius,
            backgroundColor,
            minWidth: minWidth,
          },
          ...(borderDisplay && {
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid #2F6486",
              },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #2F6486",
            },
          }),
        }}
        {...props}
      />
    </FormControl>
  );
};
export default CustomInput;
