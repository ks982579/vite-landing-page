// Used in Services...
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  isError: boolean;
  type: "credentials" | "unknown" | null;
}

export type ClearErrorFn = () => void;

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loadingState: boolean;
  errorState: LoginErrors;
  clearError: ClearErrorFn;
}
