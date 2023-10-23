import React from 'react';

import {useQuery, useQueryClient} from '@tanstack/react-query';
import {recordService} from '../../../services/record.service';
import {GetRecordsParams} from '../../../types/record';

export const useGetMyRecords = (params: GetRecordsParams) => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const queryKey = [
    'records',
    {
      ...params,
      page,
    },
  ];
  const {status, data, error, isFetching, isPreviousData, refetch, ...rest} =
    useQuery({
      queryKey: queryKey,
      queryFn: () =>
        recordService.getMyRecords({
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
          'records',
          {
            ...params,
            page: page + 1,
          },
        ],
        queryFn: () =>
          recordService.getMyRecords({
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
    ...rest,
  };
};
