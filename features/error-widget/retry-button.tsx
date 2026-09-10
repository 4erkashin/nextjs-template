"use client";

import { type ReactNode, useState } from "react";

import { Button } from "@/ui/button";
import { Caret } from "@/ui/caret";
import { ColorSplit } from "@/ui/color-split";
import { Glitch } from "@/ui/glitch";

export type RetryButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export function RetryButton({ children, onClick }: RetryButtonProps) {
  const [active, setActive] = useState(false);

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <Glitch active={active}>
        <ColorSplit active={active}>
          {">"}
          {children}
          <Caret />
        </ColorSplit>
      </Glitch>
    </Button>
  );
}
