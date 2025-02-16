import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { FC, useEffect } from "react";
import { ErrorProps } from "../types";

const Error: FC<ErrorProps> = ({ title, message }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 10000);
  });

  return (
    <div
      className={`${theme.background?.primary} ${theme.text?.primary} flex items-center justify-center h-screen`}
    >
      <div
        className={`text-center rounded-2xl p-4 ${theme.error?.background?.primary}`}
      >
        <h1 className={`text-6xl font-bold ${theme.error?.text?.primary}`}>
          {title}
        </h1>
        <p className={`text-2xl ${theme.error?.text?.primary}`}>{message}</p>
        <p className={`text-md ${theme.error?.text?.primary}`}>
          Navigating to Home in 10s...
        </p>
        <Link
          to="/"
          className={`mt-4 inline-block px-4 py-2 ${theme.text?.primary} ${theme.background?.primary} rounded`}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
