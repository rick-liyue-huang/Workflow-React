import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { Project } from "../pages/project-list";
import { useHttp } from "./http";

/**
 * we can deeper encapsulation
 * @param param
 */
export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
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

    run(client("projects", { data: cleanObject(param || {}) }));

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
