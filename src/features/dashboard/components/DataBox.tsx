import React, { useContext, useEffect, useState } from "react";
import { Paper, Box, CircularProgress } from "@mui/material";
import { Result } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContextType, AuthContext } from "@/context/AuthContext";

type GetDataResult<T, E> = Result<AxiosResponse<T>, AxiosError<E>>;

type GetDataResponse<T, E> = Promise<GetDataResult<T, E>>;

type GetDataFunction<T, E> = (signal: AbortSignal) => GetDataResponse<T, E>;

interface DataBoxProps<T, E> {
  apiRequest: GetDataFunction<T, E>;
  children: React.ReactNode;
}

interface ChildProps<T> {
  data: T | null;
}

export default function DataBox<T, E>({
  apiRequest,
  children,
}: DataBoxProps<T, E>): React.JSX.Element {
  // State
  // T is going to be the list of events, Array<t>
  const [items, setItems] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
            } // else display error
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
        "@media (min-width: 900px) and (min-height: 700px)": {
          height: "70vh",
        },
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            bgcolor: "rgba(200,200,200, 0.75)",
          }}
        >
          <CircularProgress size="20%" />
        </Box>
      ) : (
        <>{clonedChildren}</>
      )}
    </Paper>
  );
}
