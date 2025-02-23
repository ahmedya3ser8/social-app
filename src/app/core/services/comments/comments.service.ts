import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../tokens/api-token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly baseUrl = inject(API_BASE_URL);
  constructor(private httpClient: HttpClient) { }
  createComment(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/comments`, data);
  }
  getPostComments(postId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/posts/${postId}/comments`);
  }
  updateComment(commentId: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/comments/${commentId}`, data);
  }
  deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/comments/${commentId}`);
  }
}
