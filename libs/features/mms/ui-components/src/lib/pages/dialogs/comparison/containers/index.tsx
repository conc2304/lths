import { ReactNode, SyntheticEvent, ChangeEvent, useState, useEffect, useMemo } from 'react';
import { Grid, Box, Stack, Tabs, Tab, Divider } from '@mui/material';

import { PageDetail } from '@lths/features/mms/data-access';
import { 
    Colors, 
    AutocompleteOptionProps, GenericAutocomplete,
} from '@lths/features/mms/ui-editor';

import { 
    PageItemPreviewed, 
    PageListCompared, 
    ConstraintsFilters,
    ConstraintsToggle,
} from './sidebar';
import { ConstraintsFilterValues, PageItemData } from './types';
import { isPageDisabled } from './utils';
import ViewPreview from './view';
import { usePageComponentsLookup } from '../../../../hooks';
import { Constraint } from '../../../types';

const DefaultFilters = {
    eventConstraintType: Constraint.SPECIFIC_STATES, 
    eventValues:[],
    eventStateValues: [], 
    locationValues: [], 
    userValues: [],
};

const TabItems = {
    pages: { value: 'pages', label: 'PAGES' },
    constraints: { value: 'constraints', label: 'CONSTRAINTS' },
};

function TabPanel(props : {currentTab: string, value: string, children?: ReactNode}) {
    const { value, currentTab, children } = props;
    
    return (
        <div role="tabpanel" hidden={value !== currentTab}>
          {value === currentTab && children}
        </div>
      );
}

interface ComparisonContainerProps {
    pageItem?: PageDetail;
    pageList?: PageDetail[];
    defaultPageId: string;
    defaultPageIdOptions: AutocompleteOptionProps[];
    onDefaultPageIdChange: (value: string) => void;
}

export default function ComparisonContainer(props: ComparisonContainerProps) {
    const {
        pageItem, pageList,
        defaultPageId, defaultPageIdOptions, onDefaultPageIdChange,
    } = props;
    const {pageComponentsLookup, fetchPageComponents, initializePageComponentsLookup} = usePageComponentsLookup();

    const [currentTab, setCurrentTab] = useState(TabItems.pages.value);

    const [showConstraints, setShowConstraints] = useState<boolean>(true);
    const [filterValues, setFilterValues] = useState<ConstraintsFilterValues>(DefaultFilters);

    const [previewedPage, setPreviewedPage] = useState<PageItemData | undefined>();
    const [reorderablePageList, setReorderablePageList] = useState<PageItemData[] | undefined>();


    const handleTabChange = (event: SyntheticEvent, value: string) => {
        setCurrentTab(value);
    };

    const handleShowConstraintsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setShowConstraints(checked);
    };

    useEffect(() => {
        if (previewedPage) {
            setPreviewedPage((prevState) => (prevState &&{ ...prevState, isDisabled: isPageDisabled(previewedPage.page, filterValues)}));
        }
        if (pageList) { 
            setReorderablePageList((prevState) => ( prevState ? [ 
                ...(prevState.map((item) => ({...item, isDisabled: isPageDisabled(item.page, filterValues) })) )
            ] : []));
        }
    }, [filterValues]);

    const handlePreviewPageShowToggle = (value: boolean) => {
        setPreviewedPage((prevState) => (prevState && { ...prevState, isShow: value}));
    };

    useEffect(() => {
        if (pageItem) {
            setPreviewedPage({ page: pageItem, isShow: true, isDisabled: false});
        }
    }, [pageItem]);

    useEffect(() => {
        if (pageList) {
            const numOfPagesToShow = 4
            setReorderablePageList(pageList.map((page, i) => ({page: page, isShow: i < numOfPagesToShow, isDisabled: false })));
            initializePageComponentsLookup(pageList, numOfPagesToShow);

            setPreviewedPage((prevState) => (prevState && { ...prevState, isDisabled: false}));

            setFilterValues(DefaultFilters);
        } else {
            setReorderablePageList(undefined);
            initializePageComponentsLookup([], 0);

            setPreviewedPage((prevState) => (prevState && { ...prevState, isDisabled: false}));

            setFilterValues(DefaultFilters);
        }
    }, [pageList]);

    const handleDrag = (dragIndex: number, hoverIndex: number) => {
        if (reorderablePageList) {
            const newReorderablePageList= [...reorderablePageList];
        
            [newReorderablePageList[dragIndex], newReorderablePageList[hoverIndex]] = [newReorderablePageList[hoverIndex], newReorderablePageList[dragIndex]];
        
            setReorderablePageList(newReorderablePageList);
        }
    }

    const handlePageListShowToggle = (show: boolean, index: number) => {
        if(reorderablePageList && reorderablePageList.length > index) {
            const newPageList= [...reorderablePageList];
            newPageList[index].isShow = show;
            setReorderablePageList(newPageList);

            if(show) {
                const pageId = reorderablePageList[index].page.page_id
                if(pageId) fetchPageComponents(pageId);
            }
        }
    }

    const filteredPageList = useMemo(() => ([
        ...((previewedPage && previewedPage.isShow && !previewedPage.isDisabled) ? [previewedPage.page] : []),
        ...(reorderablePageList || []).reduce((filteredPages: PageDetail[], item: PageItemData) => {
                if(item.isShow && !item.isDisabled) filteredPages.push(item.page);
                return filteredPages;
            }, []),
    ]), [previewedPage, reorderablePageList]);

    const defaultPageIdLabel = defaultPageIdOptions.find((v) => v.value === defaultPageId)?.label;
    const pagesControllerTitle = (defaultPageIdLabel ? `${defaultPageIdLabel} Pages` : 'Pages')

    return (
        <Grid container direction="row" sx={{ overflow: 'hidden', height: '100%' }}>
            <Grid item xs sx={{ height: '100%', overflow: 'auto' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={currentTab} onChange={handleTabChange}>
                        <Tab label={TabItems.pages.label} value={TabItems.pages.value} />
                        <Tab label={TabItems.constraints.label} value={TabItems.constraints.value} />
                    </Tabs>
                </Box>
                <TabPanel value={TabItems.pages.value} currentTab={currentTab}>
                    <Box sx={{ padding: 2, paddingBottom: 0.5 }}>
                        <GenericAutocomplete
                            label={"Default Page ID"}
                            value={defaultPageId}
                            data={defaultPageIdOptions}
                            onChange={onDefaultPageIdChange}
                        />
                    </Box>
                    <Stack spacing={0}>
                        <PageItemPreviewed
                            title={"Previewed Page"}
                            pageItem={previewedPage}
                            onShowToggle={handlePreviewPageShowToggle}
                        />
                        <PageListCompared
                            title={pagesControllerTitle}
                            pageList={reorderablePageList}
                            onDrag={handleDrag}
                            onShowToggle={handlePageListShowToggle}
                        />
                    </Stack>
                </TabPanel>
                <TabPanel value={TabItems.constraints.value} currentTab={currentTab}>
                    <ConstraintsToggle showConstraints={showConstraints} onShowConstraintsChange={handleShowConstraintsChange} />
                    <Divider/>
                    <ConstraintsFilters filterValues={filterValues} onChange={setFilterValues}/>
                </TabPanel>
            </Grid>
            <Grid item xs={9} sx={{ backgroundColor: Colors.editor.background, height: '100%', overflow: 'auto' }}>
                <ViewPreview pageList={filteredPageList} pageComponentsLookup={pageComponentsLookup} showConstraints={showConstraints}/>
            </Grid>
        </Grid> 
    );
}