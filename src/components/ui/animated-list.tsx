"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type UIEvent,
} from "react";
import { motion, useInView } from "framer-motion";
import "./animated-list.css";

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

function AnimatedItem({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}: AnimatedItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 10, cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
}

export interface AnimatedListItem {
  id: string;
  content: ReactNode;
  selected?: boolean;
}

interface AnimatedListProps {
  items: AnimatedListItem[];
  onItemSelect?: (item: AnimatedListItem, index: number) => void;
  showGradients?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  maxHeight?: string | number;
}

export function AnimatedList({
  items,
  onItemSelect,
  showGradients = true,
  className = "",
  itemClassName = "",
  displayScrollbar = false,
  initialSelectedIndex = -1,
  maxHeight,
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState(initialSelectedIndex);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  }, []);

  return (
    <div className={`scroll-list-container ${className}`} style={{ height: maxHeight === "100%" ? "100%" : undefined }}>
      <div
        ref={listRef}
        className={`scroll-list ${!displayScrollbar ? "no-scrollbar" : ""}`}
        onScroll={handleScroll}
        style={maxHeight !== undefined ? { maxHeight } : undefined}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={item.id}
            delay={index * 0.05}
            index={index}
            onMouseEnter={() => setHoverIndex(index)}
            onClick={() => onItemSelect?.(item, index)}
          >
            <div
              className={`al-item ${item.selected || hoverIndex === index ? "selected" : ""} ${itemClassName}`}
            >
              {item.content}
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <div
          className="al-bottom-gradient"
          style={{ opacity: bottomGradientOpacity }}
        />
      )}
    </div>
  );
}
