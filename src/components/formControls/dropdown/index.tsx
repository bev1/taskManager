import { type FC } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import type { DropdownProps } from "./types.ts";

export const Dropdown: FC<DropdownProps> = ({ value, onChange, listItems }) => {
  return (
    <Select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      sx={{ backgroundColor: "white", textTransform: "capitalize" }}
    >
      {listItems.map((value, index) => {
        return (
          <MenuItem
            sx={{ textTransform: "capitalize" }}
            value={value}
            key={`${value}-${index}`}
          >
            {value}
          </MenuItem>
        );
      })}
    </Select>
  );
};
