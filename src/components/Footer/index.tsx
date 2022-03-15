import { Typography } from "@mui/material";

import "./styles.css";

export const Footer = (): JSX.Element => {
  return (
    <div className="app-footer">
      <Typography variant="body2" component="p" style={{ textAlign: "center" }}>
        Витрина E-commerce
      </Typography>
    </div>
  );
};
