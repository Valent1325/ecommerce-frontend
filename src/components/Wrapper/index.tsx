import { Container, Typography } from "@mui/material";

import "./styles.css";

type WrapperProps = {
  title?: string;
};

export const Wrapper: React.FC<WrapperProps>  = ({ title, children }) => {
  return (
    <Container maxWidth="lg" className="app-main">
      {title && (
        <Typography variant="h5" component="h1" marginBottom={2}>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  );
};
