import React, { useEffect, useState } from "react";
import * as qs from "qs";
import styled from "@emotion/styled";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";
import { Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/users";

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  token?: string;
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

export const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  const client = useHttp();

  // deal with the loading and error status on page showing

  // can be replaced by the use-async method: list act as data
  /*
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  */

  const { run, isLoading, error, data: list } = useAsync<Project[]>();

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

    run(client("projects", { data: cleanObject(debouncedParam) }));

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
  }, [debouncedParam]);

  useMount(() => {
    /*
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
    */
    client("users").then(setUsers);
  });

  // here I use useProjects
  // const {isLoading, error, data: list} = useProjects(debouncedParam);
  // here I use useUsers customHooks
  // const {data: users} = useUsers()

  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      {/*<List list={list} users={users} />*/}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListPage;
