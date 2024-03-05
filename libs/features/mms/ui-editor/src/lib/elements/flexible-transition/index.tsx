import React, { ReactElement } from 'react';
import { useRef, useState, useEffect } from 'react';

interface FlexibleTransitionProps {
  displayRightItem: boolean;
  minWidth: number;
  leftItem: ReactElement;
  rightItem: ReactElement;
}

export const FlexibleTransition: React.FC<FlexibleTransitionProps> = (props) => {
  const { displayRightItem, minWidth, leftItem, rightItem } = props;

  const hiddenElementRef = useRef(null);
  const overlayElementRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const hiddenElementObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    const overlayElementObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    if (hiddenElementRef.current) {
      hiddenElementObserver.observe(hiddenElementRef.current);
    }

    if (overlayElementRef.current) {
      overlayElementObserver.observe(overlayElementRef.current);
    }

    return () => {
      hiddenElementObserver.disconnect();
      overlayElementObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={hiddenElementRef}
        style={{
          height: `${height}px`,
          minWidth: `${minWidth}px`,
          visibility: 'hidden',
        }}
      />
      <div
        ref={overlayElementRef}
        style={{
          width: `${width}px`,
          position: 'absolute',
          overflow: 'clip',
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            transform: displayRightItem ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <div style={{ width: `${width}px`, minWidth: `${width}px` }}>{leftItem}</div>
          <div style={{ width: `${width}px`, minWidth: `${width}px` }}>{rightItem}</div>
        </div>
      </div>
    </div>
  );
};
