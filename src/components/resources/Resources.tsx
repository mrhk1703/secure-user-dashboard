import { useEffect } from "react";
import useResources from "../../hooks/useResources";
import Loader from "../Loader";
import ResourceTile from "./ResourceTile";
import React from "react";

const Resources = () => {
  const { loading, resources, getResources } = useResources();
  useEffect(() => {
    getResources();
  }, [getResources]);
  return !loading ? (
    <div>
      <div className="flex flex-wrap -mb-4 gap-y-4 gap-x-4 my-5 justify-center">
        {resources.map((resource) => {
          return <ResourceTile key={resource.id} resource={resource} />;
        })}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Resources;
