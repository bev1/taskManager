import { type FC } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import type { CheckboxProps } from "./types.ts";

export const CheckboxControl: FC<CheckboxProps> = ({
  value,
  onChange,
  checked,
  label,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={() => onChange(value)}
          color="info"
          sx={{
            "& .MuiSvgIcon-root path": { fill: "white" },
          }}
        />
      }
      label={label}
    />
  );
};
