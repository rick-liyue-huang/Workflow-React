import React, { useEffect, useState } from "react";
import * as qs from "qs";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";

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
}

export const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
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
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
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

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListPage;
