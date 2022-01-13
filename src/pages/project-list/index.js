import React, { useEffect, useState } from "react";
import * as qs from "qs";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    /*fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`)*/
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListPage;
