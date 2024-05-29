import React from "react";
import { Grid, SelectChangeEvent, TextField, Typography, Select, MenuItem } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

interface ICustomSelect {
  name: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string | false;
  disabled?: boolean;
  placeholder?: string;
  labelStyle?: string;
  fieldStyle?: string;
  options: Array<{ value: string; label: string }>;
}

export const CustomSelect = ({
  name,
  value,
  label,
  onChange,
  error,
  helperText,
  disabled,
  placeholder,
  labelStyle,
  fieldStyle,
  options
}: ICustomSelect) => {
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Grid>
      <Typography className={labelStyle}>{label}</Typography>
      <Select
        id={name}
        className={fieldStyle}
        name={name}
        value={value}
        onChange={handleSelectChange}
        error={error}
        onBlur={() => {}}
        fullWidth
        disabled={disabled}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && helperText && <Typography>{helperText}</Typography>}
    </Grid>
  );
};

interface ICustomTextInput {
  name: string;
  value: string | number | undefined;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  helperText?: string | false;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  labelStyle?: string;
  fieldStyle?: string;
  type: string;
  sx?: SystemStyleObject;
}

export const CustomTextInput = ({
  name,
  value,
  label,
  onChange,
  error,
  errorMessage,
  helperText,
  onBlur,
  disabled,
  placeholder,
  labelStyle,
  fieldStyle,
  type,
  sx
}: ICustomTextInput) => {
  return (
    <Grid width={"100%"} flex={1}>
      {label && <Typography className={labelStyle}>{label}</Typography>}
      <TextField
        id={name}
        className={fieldStyle}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        fullWidth
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        sx={sx}
      />
      {errorMessage && (
        <Typography color="error" fontSize={12} pl={"6px"} pt={"2px"} mb={"-20px"}>
          {errorMessage}
        </Typography>
      )}
    </Grid>
  );
};