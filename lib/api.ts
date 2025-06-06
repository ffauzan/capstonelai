const BASE_URL = 'https://dev-nc-api.f3h.net';

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getProfile = async (token: string) => {
  const res = await fetch(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const getCourses = async (filters?: string) => {
  const res = await fetch(`${BASE_URL}/api/courses?${filters}`);
  return res.json();
};

export const getCourseById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/courses/${id}`);
  return res.json();
};

export const getContentBased = async (course_id: string, n: number = 5) => {
  const res = await fetch(`${BASE_URL}/api/courses/recommender1?course_id=${course_id}&n=${n}`);
  return res.json();
};

export const getCollaborative = async (token: string, n: number = 5) => {
  const res = await fetch(`${BASE_URL}/api/courses/recommender3?n=${n}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const submitOnboarding = async (token: string, body: any) => {
  const res = await fetch(`${BASE_URL}/onboarding`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(body)
  });
  return res.json();
};
