import { Comment, Post, User } from "../types";

const BASE_URL = "https://gorest.co.in/public/v2";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something went wrong while loading data.");
  }

  return response.json();
}

export function getPosts() {
  return request<Post[]>(`${BASE_URL}/posts`);
}

export function getPostById(id: string) {
  return request<Post>(`${BASE_URL}/posts/${id}`);
}

export function getUserById(id: number) {
  return request<User>(`${BASE_URL}/users/${id}`);
}

export function getCommentsByPostId(postId: string) {
  return request<Comment[]>(`${BASE_URL}/posts/${postId}/comments`);
}
export function getComments() {
  return request<Comment[]>(`${BASE_URL}/comments`);
}