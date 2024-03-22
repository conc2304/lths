import { useEffect, useState } from 'react';
import { BoxProps } from '@mui/material';

import { scrollToTopInAContainer } from '@lths/shared/ui-elements';

import { ToolbarProps, ComponentProps, useToolbarContext } from '../../../../context';
import { PAGE_EDITOR_TOOLBAR_CONTAINER } from '../../../../core/containers/constants';
import { ToolBox, FlexibleTransition, ToolPreviewWysiwyg } from '../../../../elements';
import { PageAutocompleteItemProps } from '../../types';

const ToolPreviewContainer = ({ id, children, onPropChange, ...rest }: BoxProps & { onPropChange: ToolbarProps['onPropChange'] }) => {
  const { setValue, getValue } = useToolbarContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewComponents, setPreviewComponents] = useState<ComponentProps[]>([]);

  const previewPage = getValue<PageAutocompleteItemProps>('page', null);
  const isPreviewOpen = getValue<boolean>('open', false);

  const handlePreviewClose = () => {
    setValue('open', false);
  };

  useEffect(() => {
    scrollToTopInAContainer(`#${PAGE_EDITOR_TOOLBAR_CONTAINER}`);
  }, [isPreviewOpen]);

  useEffect(() => {
    handlePreviewClose();
  }, [id]);

  const receivePreviewComponents = (data: ComponentProps[]) => {
    setPreviewComponents(data);
    setIsLoading(false)
  };

  const fetchPreviewPageDetail = (pageId: string) => {
    onPropChange('pageDetail', receivePreviewComponents, { pageId: pageId });
  };

  useEffect(() => {
    if(previewPage && previewPage.value && !previewPage.static) {
      setIsLoading(true)
      setPreviewComponents([]);
      fetchPreviewPageDetail(previewPage.value);
    } else {
      setIsLoading(false)
      setPreviewComponents([]);
    }
  }, [previewPage]);

  const getPageDesc = (page?: PageAutocompleteItemProps) => {
    if (!page) return "Not Found";
    
    const pageType = page.static ? 'Static' : 'Native';
    const pageId = page.value ? page.value : 'Not Found';
    return `${pageType} Page ID: ${pageId}`;
  }

  const desc = getPageDesc(previewPage);

  return (
    <FlexibleTransition
      displayRightItem={isPreviewOpen}
      leftItem={
        <ToolBox id={id} {...rest}>
          {children}
        </ToolBox>
      }
      rightItem={
        <ToolPreviewWysiwyg
          desc={desc}
          isStaticPage={!!previewPage?.static}
          image={previewPage?.image}
          data={previewComponents}
          isLoading={isLoading}
          onClose={handlePreviewClose} 
        />
      }
    />
  );
};

export default ToolPreviewContainer;
