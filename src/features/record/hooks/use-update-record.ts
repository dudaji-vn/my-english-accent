import {MutateOptions, useMutation} from '@tanstack/react-query';
import {recordService} from '../../../services/record.service';

export const useUpdateRecord = (options?: MutateOptions) => {
  const {mutate, ...rest} = useMutation({
    mutationFn: recordService.updateRecord,
    ...options,
  });
  return {updateRecord: mutate, ...rest};
};
