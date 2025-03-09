import { createPortal } from "react-dom";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface PopoverProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  offset?: {
    top: number,
    left: number,
  };
}

// TODO: adjust content when overflowing the window, which will happen with items to the right
const Popover = (props: PopoverProps) => {
  const { isOpen, anchorEl, children, offset } = props;
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverStyles, setPopoverStyles] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (anchorEl && popoverRef.current && isOpen) {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      setPopoverStyles({
        position: "absolute",
        top: `${anchorRect.top + window.scrollY + anchorRect.height / 2 - popoverRect.height / 2 + (offset?.top ? offset.top : 0)}px`,
        left: `${anchorRect.left + window.scrollX + anchorRect.width + (offset?.left ? offset.left : 0)}px`,
        zIndex: 1000,
      });
    }
  }, [anchorEl, offset, isOpen]);

  if (!isOpen && !anchorEl) return null;

  return (
    <>
      {createPortal(
        <div
          ref={popoverRef}
          style={{ ...(popoverStyles || {}), visibility: !popoverStyles ? "hidden" : "visible" }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
};

export default Popover;