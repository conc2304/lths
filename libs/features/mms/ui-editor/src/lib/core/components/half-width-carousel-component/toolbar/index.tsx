import { useCallback, useRef, useState, useEffect, useLayoutEffect, CSSProperties } from 'react';
import { Button, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CarouselItemEditor from './carousel-Item-editor';
import { useEditorActions } from '../../../../context';
import { ToolContainer, ToolbarLabel } from '../../../../elements';
import { DraggableCarouselListItem } from '../../common/index';
import { useToolbarChange } from '../../hooks';
import { HalfWidthCarouselComponentProps } from '../../types';

const HalfWidthCarouselToolbar = (props: HalfWidthCarouselComponentProps) => {
  const {
    __ui_id__: id,
    properties_data: { sub_properties_data },
    onPropChange,
  } = props;

  const hiddenElementRef = useRef(null);
  const overlayElementRef  = useRef(null); // ToDo: Remove

  const [itemsLength, setItemsLength] = useState(sub_properties_data.length);
  const [overlayDimensions, setOverlayDimensions] = useState({ width: 0, height: 0 });
  const [height, setHeight] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [applyTransition, setApplyTransition] = useState(false);

  // const calcHeight = () => {
  //   if (applyTransition) {
  //     return Math.max((itemsLength * 39 + 200), overlayDimensions.height);
  //   } else {
  //     return (selectedIndex >= 0) ? overlayDimensions.height : (itemsLength * 39 + 200) // 175
  //   }
  // }

  // ToDo: make into hook ?
  // Update height
  useLayoutEffect(() => {
    let newHeight;
    console.log("overlayDimensions.height: ", overlayDimensions.height)
    if (true) { // Make always true to test always ussing max
      newHeight = Math.max((itemsLength * 39 + 200), overlayDimensions.height);
      console.log("newHeight1: ", newHeight)
    } else {
      newHeight = (selectedIndex >= 0) ? overlayDimensions.height : (itemsLength * 39 + 200) // 175
      console.log("newHeight2: ", newHeight)
    }
    setHeight(newHeight);
  }, [selectedIndex, applyTransition, overlayDimensions, itemsLength]);
  
  // Update apply transition
  useLayoutEffect(() => {
    setApplyTransition(true);
    console.log("apply transtion")
    const timer = setTimeout(() => {
      console.log("remove transtion")
      setApplyTransition(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedIndex]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setOverlayDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (hiddenElementRef.current) {
      resizeObserver.observe(hiddenElementRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    setItemsLength(sub_properties_data.length)
  }, [sub_properties_data.length]);

  // ToDo: make into hook end ?
  
  const { selectComponent } = useEditorActions();
  const { swapComponentProps } = useToolbarChange();

  const handleEditItem = (index: number) => {
    setSelectedIndex(index);
  };
  const handleCloseItem = () => {
    setSelectedIndex(-1);
  };

  useEffect(() => {
    handleCloseItem();
  }, [id]);

  const handleAdd = () => {
    const data = {
      ...props,
      properties_data: {
        sub_properties_data: [
          ...sub_properties_data,
          {
            title: 'New Card',
            description: 'Lorem ipsum dolor sit amet, consecteur adipiscing elit,sed do eiusmod',
            action: { type: 'native' },
          },
        ],
      },
    };
    selectComponent(data);
  };

  const handleDelete = (index) => {
    const newData = [...props.properties_data.sub_properties_data];
    newData.splice(index, 1);

    const data = { ...props, properties_data: { sub_properties_data: newData } };
    selectComponent(data);
  };

  const handleDrag = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      swapComponentProps(dragIndex, hoverIndex);
    },
    [props.properties_data]
  );

  const renderCarouselDraggableItem = (item: any, index: number) => {
    return (
      <DraggableCarouselListItem
        key={index}
        index={index}
        sub_properties_data={sub_properties_data}
        onDrag={handleDrag}
        onDelete={handleDelete}
        onEditItem={handleEditItem}
        text={item?.name}
      ></DraggableCarouselListItem>
    );
  };
  
  const slideRightStyle: CSSProperties = {
    width: `${overlayDimensions.width}px`,
  };

  const slideLeftStyle: CSSProperties = {
    width: `${overlayDimensions.width}px`,
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            height: `${height}px`,
            overflow: 'hidden',
          }}
        >
        <div ref={hiddenElementRef} 
          style={{ 
            // ToDO: handle height transform 1
            // maxHeight: `${height}px`,
            //overflow: 'hidden',
            visibility: 'hidden',
          }} 
        > {/* ToDo: prop 1 to pass to component  */}
          <ToolContainer style={{ background: 'red' }} id={id} aria-label="Half Width Carousel Floating Text Toolbar">
            <CarouselItemEditor
              item={sub_properties_data[selectedIndex]}
              onClose={handleCloseItem}
              onPropChange={onPropChange}
              index={selectedIndex}
            />
          </ToolContainer>
        </div>
        </div>
        {/* <div style={{ 
          paddingBottom:  `max(0px, ${itemsLength * 39 + 175 - overlayDimensions.height}px)`,
          backgroundColor: "green",
          }} ></div> */}
        <div
          ref={overlayElementRef} // ToDo: Remove
          style={{
            width: `${overlayDimensions.width}px`,
            // height: `${overlayDimensions.height}px`,
            position: 'absolute',
            overflow: 'hidden',
            top: 0, left: 0,
          }}
        >
          <div
            // ToDO: handle height transform 2
            style={{
              display: "flex", flexDirection: 'row',
              transform: selectedIndex >= 0 ? 'translateX(-100%)' : 'translateX(0)',
              transition: 'transform 0.5s ease-in-out',
              paddingTop: '16px',
              // opacity: 0.5,
              height: `${height}px`,
            }}
          >
            {/* element 1 */}
              <div style={slideLeftStyle}>
                <div style={{ direction: 'ltr', minWidth: `${overlayDimensions.width}px`}} > {/* ToDo: prop 2 to pass to component  */}
                  <ToolContainer style={{ marginTop: 0 }} id={id} aria-label="Half Width Carousel Floating Text Toolbar">
                    <ToolbarLabel label={'Carousel'} />
                    {sub_properties_data && itemsLength > 0 && (
                      <List>{sub_properties_data.map((item, i) => renderCarouselDraggableItem(item, i))}</List>
                    )}
                    <div>
                      <Button
                        data-testid={'Add Carousel Item'}
                        variant="outlined"
                        onClick={handleAdd}
                        sx={{ padding: '4px 10px', gap: 1, fontSize: 13 }}
                      >
                        <AddIcon sx={{ width: '18px', height: '18px' }} />
                        ADD ITEM
                      </Button>
                    </div>
                  </ToolContainer>
                </div>
              </div>
            <div style={slideRightStyle}>
              <div style={{ minWidth: `${overlayDimensions.width}px`, }} > {/* ToDo: prop 3 to pass to component  */}
                <ToolContainer style={{ marginTop: 0 }} id={id} aria-label="Half Width Carousel Floating Text Toolbar">
                  {/* <div style={{ minWidth: `${overlayDimensions.width}px`, }} > */}
                    <CarouselItemEditor
                      item={sub_properties_data[selectedIndex]}
                      onClose={handleCloseItem}
                      onPropChange={onPropChange}
                      index={selectedIndex}
                    />
                  {/* </div> */}
                </ToolContainer>
              </div>
            </div>
          </div> {/* //stack */}
        </div>
      </DndProvider>
  );
};
export default HalfWidthCarouselToolbar;
