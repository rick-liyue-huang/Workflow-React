import React from "react";
import dayjs from "dayjs";
import { Table, TableProps } from "antd";
import { Project, User } from "./index";

// here it includes the list property
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
}

const List: React.FC<ListProps> = ({ users, ...props }) => {
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
          title: "Organization",
          dataIndex: "organization",
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
        {
          title: "Created Time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("DD MMM YYYY")
                  : "none"}
              </span>
            );
          },
        },
      ]}
      // dataSource={list}
      {...props}
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
