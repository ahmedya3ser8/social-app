import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly http = inject(HttpClient);
  getAllPosts(limit: number = 20): Observable<any> {
    return this.http.get(`https://linked-posts.routemisr.com/posts?limit=${limit}`);
  }
  getSinglePost(postId: string): Observable<any> {
    return this.http.get(`https://linked-posts.routemisr.com/posts/${postId}`);
  }
  createPost(data: object): Observable<any> {
    return this.http.post(`https://linked-posts.routemisr.com/posts`, data);
  }
  getUserPosts(userId: string): Observable<any> {
    return this.http.get(`https://linked-posts.routemisr.com/users/${userId}/posts`)
  }
  updatePost(userId: string, data: object): Observable<any> {
    return this.http.put(`https://linked-posts.routemisr.com/posts/${userId}`, data);
  }
  deletePost(postId: string): Observable<any> {
    return this.http.delete(`https://linked-posts.routemisr.com/posts/${postId}`)
  }
}
