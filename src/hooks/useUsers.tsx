import { useCallback, useState } from "react";
import { api } from "./apiService";
export interface UsersData {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
const useUsers = () => {
  const [users, setUsers] = useState<UsersData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/users?page=1");
      if (response.data) {
        setUsers(response.data.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    users,
    getUsers,
  };
};

export default useUsers;
