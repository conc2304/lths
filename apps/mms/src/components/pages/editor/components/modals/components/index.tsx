import { useEffect, useState } from 'react';

import { useLazyGetComponentListQuery, useLazyGetEnumListQuery } from '@lths/features/mms/data-access';

import BasicModal from './basic';
import FullModal from './full';
import { ConnectedComponentProps, ConnectedComponentWrapperProps } from '../../types';

const ConnectedModal = (props: ConnectedComponentProps) => {
  const { open, onClose, Modal, onSelect, defaultCategory = null, showCategories } = props;
  const [category, setCategory] = useState<string>(defaultCategory);
  const [getData, { data, isFetching: isComponentListLoading }] = useLazyGetComponentListQuery();

  const [getEnumList, { data: categories, isFetching: isCategoryListLoading }] = useLazyGetEnumListQuery();

  const fetchData = async (category: string) => {
    await getData({ category });
  };

  const fetchCategoryList = async () => {
    await getEnumList('ComponentCategories');
  };

  useEffect(() => {
    setCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    fetchData(category);
  }, [category]);

  useEffect(() => {
    showCategories && fetchCategoryList();
  }, [showCategories]);

  const handleSelectedCategory = (category: string) => {
    setCategory(category);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      components={data?.data}
      categories={categories?.data?.enum_values}
      onSelect={onSelect}
      onSelectCategory={handleSelectedCategory}
      isComponentListLoading={isComponentListLoading}
      isCategoryListLoading={isCategoryListLoading}
      showCategories={showCategories}
    />
  );
};

const ComponentModal = (props: ConnectedComponentWrapperProps) => {
  const { variant, ...rest } = props;
  const modal = variant === 'full' ? FullModal : BasicModal;
  return <ConnectedModal Modal={modal} {...rest} />;
};

export default ComponentModal;
