import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import { Result } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContextType, AuthContext } from "@/context/AuthContext";

type GetDataResult<T, E> = Result<AxiosResponse<T>, AxiosError<E>>;

type GetDataResponse<T, E> = Promise<GetDataResult<T, E>>;

type GetDataFunction<T, E> = (signal: AbortSignal) => GetDataResponse<T, E>;

interface DataBoxProps<T, E> {
  apiRequest: GetDataFunction<T, E>;
  title: string;
  children: React.ReactNode;
}

interface ChildProps<T> {
  data: T | null;
}

export default function DataBox<T, E>({
  apiRequest,
  title,
  children,
}: DataBoxProps<T, E>): React.JSX.Element {
  // State
  // T is going to be the list of events, Array<t>
  const [items, setItems] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  // Context
  const user: AuthContextType = useContext(AuthContext) as AuthContextType;

  const clonedChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<ChildProps<T>>, {
          data: items,
        });
      }
    },
  );

  useEffect(() => {
    const controller = new AbortController();
    if (user.isLoggedIn) {
      (async () => {
        const itemRes: GetDataResult<T, E> = await apiRequest(
          controller.signal,
        );

        // From the Result Type
        switch (itemRes.type) {
          case "ok":
            setItems(itemRes.value.data);
            break;
          case "err":
            if (itemRes.error.status === 401) {
              user.logout();
            } else {
              setError(true);
            }
            break;
        }
        setIsLoading(false);
      })();
    }
    return () => controller.abort();
  }, [user.isLoggedIn]);

  return (
    <Paper
      elevation={5}
      sx={{
        width: { xs: 1 },
        height: "auto",
        overflow: "auto",
        "@media (min-width: 900px) and (min-height: 600px)": {
          height: "70vh",
        },
        "@media (min-width: 900px) and (min-height: 700px)": {
          height: "65vh",
        },
      }}
    >
      <Typography variant="h5" sx={{ mx: 2, my: 2 }}>
        {title}
      </Typography>
      {isLoading && !isError ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            pb: 2,
          }}
        >
          <CircularProgress
            size={"20%"}
            sx={{
              p: 2,
              m: 3,
            }}
          />
        </Box>
      ) : isError ? (
        <Paper elevation={2} sx={{ m: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              m: 1,
              px: 2,
              py: 3,
            }}
          >
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <Typography>
                Issue Retrieving data. Please try again later or contact an
                Administrator.
              </Typography>
            </Alert>
          </Box>
        </Paper>
      ) : (
        <>{clonedChildren}</>
      )}
    </Paper>
  );
}
