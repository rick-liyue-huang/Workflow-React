import React from "react";
import { Table } from "antd";
import { Project, User } from "./index";

interface ListProps {
  list: Project[];
  users: User[];
}

const List: React.FC<ListProps> = ({ list, users }) => {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "Project Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Person In Charge",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );

  /*
  return (
    <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Person In Charge</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name || ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  */
};

export default List;
