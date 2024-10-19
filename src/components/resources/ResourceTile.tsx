import React, { memo } from "react";
import { ResourceData } from "../../hooks/useResources";

const ResourceTile = memo(({ resource }: { resource: ResourceData }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center mb-2">
          <div
            style={{
              borderRadius: "100px",
              backgroundColor: resource.color,
              height: "50px",
              width: "50px",
            }}
            className="mr-5"
          ></div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {resource.name}
          </h5>
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`${resource.pantone_value} - ${resource.year}`}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
});

export default ResourceTile;
