import React from "react";
import { Button } from "../ui/button";

const StyledButton = ({
  children,
  isLoading,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={`w-full bg-theme-gradient hover:bg-theme-gradient-hover transition-all transform duration-300 ease-in-out hover:shadow-lg ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
