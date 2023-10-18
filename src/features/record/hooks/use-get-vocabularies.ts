import {useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {vocabularyService} from '../../../services/vocabulary.service';
import {GetVocabulariesParams} from '../../../types/vocabulary';

export const useGetVocabularies = (
  params: GetVocabulariesParams,
  key?: string,
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const queryKey = [
    `vocabularies ${key}`,
    {
      ...params,
      page,
    },
  ];
  const {status, data, error, isFetching, isPreviousData, refetch} = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      vocabularyService.getVocabularies({
        ...params,
        page,
      }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  React.useEffect(() => {
    if (!isPreviousData && data?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: [
          'vocabularies',
          {
            ...params,
            page: page + 1,
          },
        ],
        queryFn: () =>
          vocabularyService.getVocabularies({
            ...params,
            page: page + 1,
          }),
      });
    }
  }, [data, isPreviousData, page, params, queryClient]);

  const fetchNextPage = React.useCallback(() => {
    if (!isPreviousData && data?.hasNextPage) {
      setPage(old => old + 1);
    }
  }, [data, isPreviousData]);

  return {
    status,
    data,
    error,
    isFetching,
    isPreviousData,
    page,
    setPage,
    fetchNextPage,
    refetch,
    queryKey,
  };
};
