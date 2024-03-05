import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CalendarViewToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { CalendarViewComponentProps } from '../../types';

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

describe('CalendarView Toolbar', () => {
  let initialState;
  let component: CalendarViewComponentProps;

  beforeEach(() => {

    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.CalendarView,
      data: {
        tab_mode: 'scrollable',
        start_month: '1',
        start_year: '2001',
        end_month: '6',
        end_year: '2001',
        selected_month: '', 
        selected_year: '',
      },
    };

    initialState = {
      components: [],
      selectedComponent: component,
    };
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders toolbar component', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarViewToolbar {...component} />
        </LocalizationProvider>
      </EditorProvider>
    );

    const renderToolContainer = screen.getByLabelText('Calendar View Toolbar');
    expect(renderToolContainer).toBeInTheDocument();
  });

  test('renders toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarViewToolbar {...component} />
        </LocalizationProvider>
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Calendar');
    expect(toolbarlabel).toBeInTheDocument();

    const rangeSectionLabel = screen.getByText('Range');
    expect(rangeSectionLabel).toBeInTheDocument();

    const selectedSectionLabel = screen.getByText('Selected', {selector: 'p'});
    expect(selectedSectionLabel).toBeInTheDocument();

    const sourceSectionLabel = screen.getByText('Source Type');
    expect(sourceSectionLabel).toBeInTheDocument();
  });

  test('renders toolbar with correct date data', async () => {
    component.data.start_month = '12'; // December
    component.data.start_year = '2024'; // 2024
    component.data.end_month = '5'; // May
    component.data.end_year = '2025'; // 2025
    component.data.selected_month = '4'; // April
    component.data.selected_year = '2025'; // 2025

    render(
      <EditorProvider initialValue={initialState}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CalendarViewToolbar {...component} />
        </LocalizationProvider>
      </EditorProvider>
    );

    const startDateInputContainer = screen.getByText('Start', {selector: 'label'}).parentElement as HTMLElement;
    const startDateInput = startDateInputContainer.querySelector('input');
    expect(startDateInput?.value).toContain('December 2024');
    const endDateInputContainer = screen.getByText('End', {selector: 'label'}).parentElement as HTMLElement;
    const endDateInput = endDateInputContainer.querySelector('input');
    expect(endDateInput?.value).toContain('May 2025');
    const selectedDateInputContainer = screen.getByText('Selected', {selector: 'label'}).parentElement as HTMLElement;
    const selectedDateInput = selectedDateInputContainer.querySelector('input');
    expect(selectedDateInput?.value).toContain('April 2025');
  });
});