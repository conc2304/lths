import { useState, useEffect, useMemo } from 'react';

import {
  PageDetail,
  useLazyGetPageDetailsQuery,
  useLazyGetDefaultPagesQuery,
  formatConstraintsToReadable,
} from '@lths/features/mms/data-access';
import { AutocompleteOptionProps } from '@lths/features/mms/ui-editor';

import ComparisonContainer from './containers'
import { FullScreenDialog } from '../../../common';
import { useDefaultAndVariantPages } from '../../../hooks';

type ComparisonAlertProps = {
  isOpen: boolean;
  handleClose: () => void;
  page_id?: string;
  default_page_id?: string;
};

export const ComparisonAlert = ({ isOpen, handleClose, page_id, default_page_id }: ComparisonAlertProps) => {
  const [getPageDetail] = useLazyGetPageDetailsQuery();
  const [getDefaultPages] = useLazyGetDefaultPagesQuery();

  const [previewedPageDetail, setPreviewedPageDetail] = useState<PageDetail | undefined>();

  const { defaultAndVariantPages, fetchDefaultAndVariantPages, clearDefaultAndVariantPages } = useDefaultAndVariantPages();

  const [defaultPageIdOptions, setDefaultPageIdOptions] = useState<AutocompleteOptionProps[]>([]);
  const [selectedDefaultPageId, setSelectedDefaultPageId] = useState<string>('');

  const fetchPreviewedPageDetail = async (page_id: string) => {
    const response = await getPageDetail(page_id).unwrap();
    if (response && response.success && response.data) {
      const pageDetail = { ...response.data, constraints_formatted: formatConstraintsToReadable(response.data.constraints) };
      setPreviewedPageDetail(pageDetail);
    } else {
      setPreviewedPageDetail(undefined);
    }
  };

  const fetchDefaultPageIdOptions = async () => {
    const response = await getDefaultPages().unwrap();
    if (response && response.success && response.data) {
      setDefaultPageIdOptions(response.data.map((o) => ({ label: o.name, value: o.page_id })));
    }
  };

  useEffect(() => {
    if (isOpen) {
      page_id && fetchPreviewedPageDetail(page_id);
      fetchDefaultPageIdOptions();
    } else {
      setSelectedDefaultPageId('');
      clearDefaultAndVariantPages();
    }
  }, [isOpen, page_id]);

  useEffect(() => {
    const defaultPage = defaultPageIdOptions.find((defaultPage) => defaultPage.value === page_id || defaultPage.value === default_page_id );
    const pageId = defaultPage?.value || '';
    setSelectedDefaultPageId(pageId);
  }, [defaultPageIdOptions]);

  useEffect(() => {
    if (isOpen) {
      if(selectedDefaultPageId) {
        fetchDefaultAndVariantPages(selectedDefaultPageId);
      } else {
        clearDefaultAndVariantPages();
      }
    };
  }, [selectedDefaultPageId]);

const pageList = useMemo(() => defaultAndVariantPages?.filter((page) => (page.page_id !== page_id)), [defaultAndVariantPages]);

  return (
    <FullScreenDialog
      title="Page Comparison Tool"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <ComparisonContainer
        pageItem={previewedPageDetail}
        pageList={pageList}

        defaultPageId={selectedDefaultPageId}
        defaultPageIdOptions={defaultPageIdOptions}
        onDefaultPageIdChange={(value) => setSelectedDefaultPageId(value)}
      />
    </FullScreenDialog>
  );
};