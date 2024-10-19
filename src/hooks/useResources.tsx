import { useCallback, useState } from "react";
import { api } from "./apiService";
export interface ResourceData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
const useResources = () => {
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getResources = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/unknown");
      if (response.data) {
        setResources(response.data.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    resources,
    getResources,
  };
};

export default useResources;
