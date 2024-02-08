import { log } from "console";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      suspense: false, // Suspense 비활성화
    },
  },
});

//특정 쿼리에 대한 재정의
queryClient.setDefaultOptions({});

export default queryClient;


