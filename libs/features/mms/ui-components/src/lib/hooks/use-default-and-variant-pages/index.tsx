import { useState } from 'react';

import { PageItemsRequest, PageDetail, useLazyGetPagesItemsQuery } from '@lths/features/mms/data-access';

export const useDefaultAndVariantPages = () => {
    const [getData] = useLazyGetPagesItemsQuery();

    const [defaultAndVariantPages, setDefaultAndVariantPages] = useState<PageDetail[] | undefined>();

    const clearDefaultAndVariantPages = () => {
        setDefaultAndVariantPages(undefined);
    };

    const fetchDefaultAndVariantPages = async (page_id: string) => {
        if (page_id) {
            try {
                // ToDO: update api call
                // needs api that can filter based on page_id, to return default and variant pages
                const req: PageItemsRequest = {};
                req.limit = '50';

                const response = await getData(req);
                const pages = response?.data?.data;

                if (!pages) return;

                const variantPages = pages.filter((page) => (page.default_page_id === page_id));
                const defaultPage = pages.find((page) => (page.page_id === page_id)) || null;

                setDefaultAndVariantPages([...(defaultPage ? [defaultPage] : []), ...variantPages]);
            } catch (error) {
                console.error(`Error fetching pages for page_id ${page_id}: `, error);
            };
        } else {
            setDefaultAndVariantPages([]);
        }
    };

    return { defaultAndVariantPages, fetchDefaultAndVariantPages, clearDefaultAndVariantPages };
};