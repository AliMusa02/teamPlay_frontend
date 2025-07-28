export const API_URL = "https://teamplaybackend.up.railway.app";

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  // if (!response.ok) {
  //   throw new Error(data.message || "Fetch failed");
  // }
  if (!response.ok) {
    const errorObj = new Error(
      data.detail ||
        data.message ||
        data.about ||
        data.content ||
        "Fetch failed"
    );
    errorObj.status = response.status;
    errorObj.raw = data;
    throw errorObj;
  }

  return {
    data,
    status: response.status,
    ok: response.ok,
  };
};
