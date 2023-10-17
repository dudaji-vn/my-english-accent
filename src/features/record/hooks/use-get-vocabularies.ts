import React from 'react';
import {GetVocabulariesParams} from '../../../types/vocabulary';
import {vocabularyService} from '../../../services/vocabulary.service';
import {UseQueryOptions, useQuery, useQueryClient} from '@tanstack/react-query';

export const useGetVocabularies = (
  params: GetVocabulariesParams,
  options?: UseQueryOptions,
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const {status, data, error, isFetching, isPreviousData, refetch} = useQuery({
    queryKey: [
      'vocabularies',
      {
        ...params,
        page,
      },
    ],
    queryFn: () =>
      vocabularyService.getVocabularies({
        ...params,
        page,
      }),
    keepPreviousData: true,
    staleTime: 5000,
    ...options,
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
  };
};
