import React, { ReactElement } from 'react';
import { useRef, useState, useEffect } from 'react';

import { FLEXIBLE_TRANSITION_MIN_WIDTH } from '../../../common';

interface FlexibleTransitionMultiSlideProps {
  selectedIndex: number;
  minWidth?: number;
  items: ReactElement[];
}

export const FlexibleTransitionMultiSlide: React.FC<FlexibleTransitionMultiSlideProps> = (props) => {
  const { selectedIndex, minWidth = FLEXIBLE_TRANSITION_MIN_WIDTH, items } = props;

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
          overflow: 'hidden',
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            transform: `translateX(${-100*selectedIndex}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
            {items.map((item, i) => {
                return <div key={`slide_item_${i}`} style={{ width: `${width}px`, minWidth: `${width}px` }}>{item}</div>;
            })}
        </div>
      </div>
    </div>
  );
};
