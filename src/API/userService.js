import { api } from "./const";

export const fetchUserData = async (userId) => {
  let loading = true;
  let data = null;

  try {
    const response = await api(`/api/users/${userId}/`, {
      method: "GET",
    });
    data = response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    loading = false;
  }

  return { data, loading };
};
