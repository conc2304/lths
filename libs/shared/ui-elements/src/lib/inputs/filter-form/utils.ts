import _ from 'lodash';

import { FormSchema, Seq } from '@lths/types/ui-filters';

export const sortBySeq = (formSchema: FormSchema[], dir: 'asc' | 'desc' = 'asc'): FormSchema[] => {
  return formSchema.sort((a, b) => {
    let seqA = a.seq ?? Infinity;
    let seqB = b.seq ?? Infinity;

    if (Array.isArray(seqA)) {
      seqA = seqA[0] ?? Infinity;
    }

    if (Array.isArray(seqB)) {
      seqB = seqB[0] ?? Infinity;
    }

    if (seqA === seqB) {
      seqA = a.seq ? (Array.isArray(a.seq) ? a.seq[1] ?? Infinity : Infinity) : Infinity;
      seqB = b.seq ? (Array.isArray(b.seq) ? b.seq[1] ?? Infinity : Infinity) : Infinity;
    }

    if (dir === 'desc') {
      return seqB - seqA;
    } else {
      return seqA - seqB;
    }
  });
};

export const formatWithSeq = (_data: FormSchema[]): FormSchema[] => {
  const data = _data.map((dataItem) => {
    let seq: Seq;

    if (dataItem.seq === null || dataItem.seq === undefined) {
      seq = [Infinity, Infinity];
    } else if (typeof dataItem.seq === 'number') {
      seq = [dataItem.seq, Infinity];
    } else if (Array.isArray(dataItem.seq) && !dataItem.seq[1]) {
      seq = [dataItem.seq[0], Infinity];
    } else {
      seq = dataItem.seq;
    }

    let formattedDataItem: FormSchema = {
      ...dataItem,
      seq,
    };

    if (dataItem.data) {
      formattedDataItem = {
        ...formattedDataItem,
        data: formatWithSeq(dataItem.data),
      };
    }

    return formattedDataItem;
  });

  return data;
};

export const groupItemsBySeq = (data: FormSchema[]): { [key: string]: FormSchema[] } => {
  const groups: { [key: string]: FormSchema[] } = {};

  data.forEach((item: FormSchema) => {
    const seq = item.seq as [number, number];
    const seq0 = seq[0];
    if (seq0 === Infinity) {
      groups[item.id || item.title || Math.random() * 10000] = [item];
    } else {
      if (!groups[seq0]) {
        groups[seq0] = [item];
      } else {
        groups[seq0].push(item);
      }
    }
  });

  return groups;
};

export const getPluralizeLastWord = (words: string): string => {
  const wordsToArr = words.trim().split(' ');
  const word = wordsToArr[wordsToArr.length - 1];
  if (_.endsWith(word, 'y')) {
    return word.slice(0, -1) + 'ies';
  }
  if (_.endsWith(word, 's')) {
    return word; // Not always true but gooe enough for now
  }
  return word + 's';
};
