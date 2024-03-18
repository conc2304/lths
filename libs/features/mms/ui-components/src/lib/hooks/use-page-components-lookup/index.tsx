import { useState } from 'react';
import toast from 'react-hot-toast';

import { PageDetail, useLazyGetPageDetailsQuery } from '@lths/features/mms/data-access';
import { ComponentProps } from '@lths/features/mms/ui-editor';

export type PageComponentsLookup = {
    [pageId: string]: {
        components: ComponentProps[], 
        loading: boolean,
    }
};

export const usePageComponentsLookup = () => {
    const [getPageDetail] = useLazyGetPageDetailsQuery();

    const [pageComponentsLookup, setPageComponentsLookup]  = useState<PageComponentsLookup>({});

    const fetchPageDetail = async (page_id: string) => {
        try {
            const response = await getPageDetail(page_id).unwrap();
            if (response && response.success || response.data) {
                const pageComponents = response.data.components;
                setPageComponentsLookup((prevState) => ({
                    ...prevState, 
                    [page_id]: { 
                        components: pageComponents, 
                        loading: false,
                    },
                }));
            }
        } catch (error) {
            console.error('Error in fetching the page components: ', error);
            toast.error('Failed fetching page components for: ' + page_id);
            setPageComponentsLookup((prevState) => ({...prevState, [page_id]: { components: [], loading: false }}));
        }
    };

    const fetchPageComponents = async (page_id: string) => {
        if(page_id && !pageComponentsLookup[page_id]) {
            setPageComponentsLookup((prevState) => ({
                ...prevState, 
                [page_id]: { 
                    components: [],
                    loading: true ,
                }
            }));

            fetchPageDetail(page_id);
        }
    };

    const initializePageComponentsLookup = async (pageList: PageDetail[], maxLoad: number) => {
        const initialCount = Math.min(pageList.length, maxLoad);
        
        const initialPageComponentsLookup: PageComponentsLookup = {}
        for (let i = 0; i < initialCount; i++) {
            const pageId = pageList[i].page_id;
            initialPageComponentsLookup[pageId] = { components: [], loading: true }
        }

        setPageComponentsLookup(initialPageComponentsLookup);

        for (let i = 0; i < initialCount; i++) {
            const pageId = pageList[i].page_id;
            fetchPageDetail(pageId);
        }
    };

    return { pageComponentsLookup, fetchPageComponents, initializePageComponentsLookup };
};