import { User } from "../pages/project-list";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    /*fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`)*/
    /*
		fetch(
			`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
		).then(async (response) => {
			if (response.ok) {
				setList(await response.json());
			}
		});
		*/

    run(client("users", { data: cleanObject(param || {}) }));

    // before the page show the data
    /*
		setIsLoading(true);

		client("projects", { data: cleanObject(debouncedParam) })
			.then(setList)
			.catch((err) => {
				setError(err);
				setList([]);
			})
			.finally(() => setIsLoading(false));

		*/

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
