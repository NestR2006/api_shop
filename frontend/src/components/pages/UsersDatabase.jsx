import React, { useEffect, useState } from "react";

import "../../styles/usersDatabase.css";

const UsersDatabase = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await fetch("/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    };
    asyncFetch();
  }, []);
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => {
          return (
            <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersDatabase;
