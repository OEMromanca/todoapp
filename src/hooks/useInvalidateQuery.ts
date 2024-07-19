import { useQueryClient } from 'react-query';

const useInvalidateQuery = (queryKey: string | string[]) => {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries(queryKey);
  };

  return invalidateQuery;
};

export default useInvalidateQuery;
