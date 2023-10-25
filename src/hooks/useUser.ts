import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {userService} from '../services/user.service';

export const useUser = () => {
  const queryClient = useQueryClient();

  const {data: keywords} = useQuery({
    queryKey: ['myKeyword'],
    queryFn: userService.getMyKeyword,
  });

  const addKeywordMutation = useMutation(
    (keyword: string) => userService.addKeyword(keyword),
    {
      onSuccess: newKeyword => {
        queryClient.invalidateQueries(['myKeyword']);
      },
    },
  );
  const deleteKeywordMutation = useMutation(
    (id: string) => userService.deleteKeyword(id),
    {
      onSuccess: newKeyword => {
        queryClient.invalidateQueries(['myKeyword']);
      },
    },
  );

  const addUserKeyword = async (newKeyword: string) => {
    await addKeywordMutation.mutateAsync(newKeyword);
  };

  const deleteUserKeyword = async (id: string) => {
    await deleteKeywordMutation.mutateAsync(id);
  };

  return {
    keywords,
    addUserKeyword,
    deleteUserKeyword,
  };
};
