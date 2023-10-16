import React from 'react';

import SegmentComponent from './segment';
import { BasicContainer } from '../../../../elements';
import { Carousel } from '../../common';
import { SegmentGroupProps } from '../../types';
const SegmentGroupComponent = (props: SegmentGroupProps) => {
  const {
    __ui_id__: id,
    data: { sub_component_data },
  } = props;

  const segments = sub_component_data.map((item, index) => {
    const { title, description, segment_id } = item;
    return <SegmentComponent title={title} description={description} key={segment_id} index={index} />;
  });

  return (
    <BasicContainer id={id}>
      <Carousel items={segments} />
    </BasicContainer>
  );
};

export default SegmentGroupComponent;
