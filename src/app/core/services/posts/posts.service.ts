import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../tokens/api-token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly baseUrl = inject(API_BASE_URL);
  constructor(private httpClient: HttpClient) { }
  createPost(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/posts`, data);
  }
  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/posts`);
  }
  getMyPosts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/664bcf3e33da217c4af21f00/posts`);
  }
  getPostById(postId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/posts/${postId}`);
  }
  updatePost(postId: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/posts/${postId}`, data);
  }
  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/posts/${postId}`);
  }
}
