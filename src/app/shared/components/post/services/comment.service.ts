import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly http = inject(HttpClient);
  createComment(data: object): Observable<any> {
    return this.http.post(`https://linked-posts.routemisr.com/comments`, data);
  }
  updateComment(commentId: string, data: object): Observable<any> {
    return this.http.put(`https://linked-posts.routemisr.com/comments/${commentId}`, data);
  }
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`https://linked-posts.routemisr.com/comments/${commentId}`);
  }
}
