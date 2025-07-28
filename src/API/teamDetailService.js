import { api } from "./const";

export const fetchTeamData = async (teamId) => {
  let loading = true;
  let data = null;

  try {
    const response = await api(`/api/teams/${teamId}/`, {
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
