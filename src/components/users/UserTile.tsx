import React, { memo } from "react";
import { UsersData } from "../../hooks/useUsers";

const UserTile = memo(({ user }: { user: UsersData }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-full " src={user.avatar} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {`${user.first_name} ${user.last_name}`}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {user.email}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
});

export default UserTile;
