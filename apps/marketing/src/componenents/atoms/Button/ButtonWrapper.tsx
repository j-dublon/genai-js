"use client";
import { Button } from "@react-component-library/ui";
import { JSX } from "react";

export const ButtonWrapper = (): JSX.Element => {
  return (
    <Button
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert("Hello from Turborepo!");
      }}
    >
      Hello
    </Button>
  );
};
