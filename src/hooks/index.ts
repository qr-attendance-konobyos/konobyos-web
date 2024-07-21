import { useSearchParams } from "react-router-dom";

export const usePageSize = () => {
  const [search, setSearchParam] = useSearchParams();
  const page = parseInt(search.get("page") ?? "0");
  const size = parseInt(search.get("size") ?? "10");
  return {
    page,
    size,
    nextPage: () =>
      setSearchParam((prev) => {
        prev.set("page", `${page + 1}`);
        return prev;
      }),
    previousPage: () =>
      setSearchParam((prev) => {
        prev.set("page", `${page > 0 ? page - 1 : page}`);
        return prev;
      }),
  };
};
