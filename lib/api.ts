export async function loginUser(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      throw new Error("Login failed");
    }
  
    return res.json(); // { token, user }
  }
  
  export const registerUser = async (user) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
  
    if (!response.ok) {
      throw new Error("Failed to register")
    }
  
    return response.json()
  }
  
  