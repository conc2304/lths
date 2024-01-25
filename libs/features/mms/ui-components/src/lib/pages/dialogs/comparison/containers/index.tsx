import { ReactNode, SyntheticEvent, ChangeEvent, useState, useEffect } from 'react';
import { Grid, Box, Stack, Tabs, Tab, Divider } from '@mui/material';

import { PageDetail } from '@lths/features/mms/data-access';
import { 
    Colors, 
    AutocompleteOptionProps, GenericAutocomplete,
} from '@lths/features/mms/ui-editor';

import { 
    PageItemPreviewed, 
    PageListCompared, 
    ConstraintsFilters, ConstraintsFiltersValues, 
    ConstraintsToggle 
} from './sidebar';
import ViewPreview from './view';

interface ComparisonContainerProps {
    previewedPage?: PageDetail;
    pageList?: PageDetail[];
    defaultPageId: string;
    defaultPageIdOptions: AutocompleteOptionProps[];
    onDefaultPageIdChange: (value: string) => void;
}

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

export default function ComparisonContainer(props: ComparisonContainerProps) {
    const {
        previewedPage, pageList,
        defaultPageId, defaultPageIdOptions, onDefaultPageIdChange,
    } = props;

    const [previewedPageShow, setPreviewedPageShow] = useState<boolean>(true);
    const [previewedPageDisabled, setPreviewedPageDisabled] = useState<boolean>(false);

    const [reorderablePageList, setReorderablePageList] = useState<PageDetail[] | undefined>();
    const [showPageList, setShowPageList] = useState<boolean[]>([]);
    const [disabledPageList, setDisabledPageList] = useState<boolean[]>([]);

    const [filteredPageList, setFilteredPageList] = useState<PageDetail[]>([]);

    const [currentTab, setCurrentTab] = useState(TabItems.pages.value);

    const [showConstraints, setShowConstraints] = useState<boolean>(true);

    const [filterValues, setFilterValues] = useState<ConstraintsFiltersValues>({});

    const handleTabChange = (event: SyntheticEvent, value: string) => {
        setCurrentTab(value);
    };

    const handleShowConstraintsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setShowConstraints(checked);
    };

    useEffect(() => {
        if (previewedPage) {
            setPreviewedPageShow(true);
            setPreviewedPageDisabled(false);
        }
    }, [previewedPage]);

    useEffect(() => {
        if (pageList) {
            setReorderablePageList(pageList);
            setShowPageList(Array(pageList.length).fill(true));
            setDisabledPageList(Array(pageList.length).fill(false));
            setPreviewedPageDisabled(false);
            setFilterValues({});
        } else {
            setReorderablePageList(undefined);
            setShowPageList([]);
            setDisabledPageList([]);
            setPreviewedPageDisabled(false);
            setFilterValues({});
            
        }
    }, [pageList]);

    const handleDrag = (dragIndex: number, hoverIndex: number) => {
        if (reorderablePageList) {
            const newReorderablePageList= [...reorderablePageList];
            const newShowPageList = [...showPageList];
            const newDisabledPageList = [...disabledPageList];
        
            [newReorderablePageList[dragIndex], newReorderablePageList[hoverIndex]] = [newReorderablePageList[hoverIndex], newReorderablePageList[dragIndex]];
            [newShowPageList[dragIndex], newShowPageList[hoverIndex]] = [newShowPageList[hoverIndex], newShowPageList[dragIndex]];
            [newDisabledPageList[dragIndex], newDisabledPageList[hoverIndex]] = [newDisabledPageList[hoverIndex], newDisabledPageList[dragIndex]];
        
            setReorderablePageList(newReorderablePageList);
            setShowPageList(newShowPageList);
            setDisabledPageList(newDisabledPageList);
        }
    }

    const handlePageListShowToggle = (show: boolean, index: number) => {
        const newShowPageList = [...showPageList];
        newShowPageList[index] = show;
        setShowPageList(newShowPageList);
    }

    useEffect(() => {
        const newfilteredPreviewList = [
            ...(previewedPage && (previewedPageShow && !previewedPageDisabled) ? [previewedPage] : []),
            ...(reorderablePageList || []).filter((item, index) => showPageList[index] && !disabledPageList[index] )
        ];
        setFilteredPageList(newfilteredPreviewList);
    }, [previewedPage, previewedPageShow, previewedPageDisabled, reorderablePageList, showPageList, disabledPageList]);

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
                            page={previewedPage}
                            show={previewedPageShow}
                            disabled={previewedPageDisabled}
                            onShowToggle={setPreviewedPageShow}
                        />
                        <PageListCompared
                            title={pagesControllerTitle}
                            pageList={reorderablePageList}
                            showPageList={showPageList}
                            disabledPageList={disabledPageList}
                            onDrag={handleDrag}
                            onShowToggle={handlePageListShowToggle}
                        />
                    </Stack>
                </TabPanel>
                <TabPanel value={TabItems.constraints.value} currentTab={currentTab}>
                    <ConstraintsToggle showConstraints={showConstraints} onShowConstraintsChange={handleShowConstraintsChange} />
                    <Divider/>
                    <ConstraintsFilters
                        previewedPage={previewedPage} pageList={reorderablePageList}
                        filterValues={filterValues} setFilterValues={setFilterValues}
                        setPreviewedPageDisabled={setPreviewedPageDisabled} setDisabledPageList={setDisabledPageList}
                    />
                </TabPanel>
            </Grid>
            <Grid item xs={9} sx={{ backgroundColor: Colors.editor.background, height: '100%', overflow: 'auto' }}>
                <ViewPreview pageList={filteredPageList} showConstraints={showConstraints}/>
            </Grid>
        </Grid> 
    );
}