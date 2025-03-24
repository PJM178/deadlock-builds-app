import React from "react";
import { createPortal } from "react-dom";
import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./Popover.module.css";

interface PopoverProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  offset?: {
    top: number,
    left: number,
  };
  position: "center" | "top";
}

const Popover = (props: PopoverProps) => {
  const { isOpen, anchorEl, children, offset, position } = props;
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverStyles, setPopoverStyles] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (anchorEl && popoverRef.current && isOpen) {
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();

      let top = anchorRect.top + window.scrollY + (position === "center" ? anchorRect.height / 2 - popoverRect.height / 2 : 0) + (offset?.top ? offset.top : 0);
      let left = anchorRect.left + window.scrollX + anchorRect.width + (offset?.left ? offset.left : 0);

      const viewportWidth = window.innerWidth;

      if (left + popoverRect.width > viewportWidth) {
        left = viewportWidth - popoverRect.width - 20;
      }

      if (top < 0) {
        top = 6;
      }

      setPopoverStyles({
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1000,
      });
    }
  }, [anchorEl, offset, isOpen, position]);

  if (!isOpen && !anchorEl) return null;

  return (
    <>
      {createPortal(
        <div
          data-testid="popover"
          ref={popoverRef}
          className={styles["container"]}
          style={{ ...(popoverStyles || { visibility: "hidden" }) }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
};

export default Popover;