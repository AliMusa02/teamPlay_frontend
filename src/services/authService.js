const refreshToken = localStorage.getItem("refreshToken");

export const getValidAccessToken = async () => {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("tokenExpiration");

  const now = Date.now();

  if (!token || !exp || now > Number(exp)) {
    const res = await fetch(`${API_URL}api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await res.json();

    if (res.ok) {
      const newToken = data.access;
      localStorage.setItem("accessToken", newToken);

      const payload = JSON.parse(atob(newToken.split(".")[1]));
      localStorage.setItem("tokenExpiration", payload.exp * 1000);

      return newToken;
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiration");
      window.location.href = "/login";
    }
  }

  return token;
};
// authService.js
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("tokenExpiration");
  return token && exp && Date.now() < Number(exp);
};

export const getUsernameFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { name: payload.user_name, id: payload.user_id } || null;
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
};
