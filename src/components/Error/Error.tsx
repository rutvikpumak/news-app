import React from "react";

interface ErrorProps {
  error: {
    message?: string;
  };
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return <div>Error: {error.message || "Something went wrong..."}</div>;
};

export default Error;
