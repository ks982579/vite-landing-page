import { Box, Container, Typography } from "@mui/material";
import React, { JSX } from "react";

const PageNotFound404: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Box>
        <Typography variant="h1">404 Page Not Found</Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound404;
