import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import Textarea from "@mui/joy/Textarea";

const CustomTextarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error = false,
  helperText = "",
  minRows = 4,
  width = "100%",
  marginTop,
  backgroundColor = "transparent",
  borderRadius = "8px",
  borderDisplay = false,

  disabled = false,
  onlyRead = false,
  ...props
}) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    const syntheticEvent = {
      target: {
        value,
        name,
      },
    };
    onChange?.(syntheticEvent);
  };

  return (
    <FormControl sx={{ width, marginTop }}>
      {label ? <label>{label}</label> : ""}
      <Textarea
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={handleInputChange}
        minRows={minRows}
        error={error}
        disabled={disabled}
        readOnly={onlyRead}
        variant="outlined"
        color="neutral"
        sx={{
          backgroundColor,
          "& .MuiInputBase-root": {
            // height,
            width,
            borderRadius,
            backgroundColor,
            // minWidth: minWidth,
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
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomTextarea;
