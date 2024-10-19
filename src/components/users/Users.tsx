import React, { useEffect } from "react";
import useUsers from "../../hooks/useUsers";
import Loader from "../Loader";
import UserTile from "./UserTile";

const Users = () => {
  const { loading, users, getUsers } = useUsers();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return !loading ? (
    <div>
      <div className="flex flex-wrap -mb-4 gap-y-4 gap-x-4 my-5 justify-center">
        {users.map((user) => {
          return <UserTile key={user.id} user={user} />;
        })}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Users;
