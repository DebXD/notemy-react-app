import axios from "axios";

const notemyApi = axios.create({ baseURL: "https://notemy.dustbin.me/api/v1" });

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//! Auth
//? For login
export const userSignIn = async (loginCredentials: object) => {
  const response = await notemyApi.post("/auth/login/", loginCredentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  return response;
};

//? For register
export const userSignUp = async (signUpCredentials: object) => {
  const response = await notemyApi.post("/auth/login/", signUpCredentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

//! Notes
//? For getting all notes
export const getNotes = async (token: string) => {
  const response = await notemyApi.get("/notes/?page=1&per_page=10000", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  // await sleep(10000);
  console.log("fetching...Notes");
  return response.data;
};

//? For adding note
export const addNote = async (
  title: string,
  content: string,
  token: string
) => {
  const response = await notemyApi.post(
    "/notes/",
    {
      title: title,
      content: content,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
};

//? For adding note
export const updateNote = async (
  title: string,
  content: string,
  token: string,
  id: string | number
) => {
  const response = await notemyApi.post(
    `/notes/${id}/`,
    {
      title: title,
      content: content,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
};

//? For Deleting note
export const deleteNote = async (token: string, id: string | number) => {
  const response = await notemyApi.delete(`/notes/${id}/`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};

//? For Deleting note
export const searchNote = async (token: string, id: string | number) => {
  const response = await notemyApi.delete(`/notes/${id}/`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};

export default notemyApi;
