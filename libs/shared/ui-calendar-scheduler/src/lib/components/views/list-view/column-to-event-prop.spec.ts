import { BaseColumnValue } from './column-to-event-prop';

describe('BaseColumnValue', () => {
  it('returns the value for a valid column', () => {
    const event = {
      title: 'Test Event',
      column1: 'Value 1',
      column2: 'Value 2',
    };

    const columnValue1 = BaseColumnValue(event, 'column1');
    const columnValue2 = BaseColumnValue(event, 'column2');

    expect(columnValue1).toBe('Value 1');
    expect(columnValue2).toBe('Value 2');
  });

  it('returns false for an invalid column', () => {
    const event = {
      title: 'Test Event',
      column1: 'Value 1',
    };

    const invalidColumnValue = BaseColumnValue(event, 'invalidColumn');

    expect(invalidColumnValue).toBe(false);
  });
});
