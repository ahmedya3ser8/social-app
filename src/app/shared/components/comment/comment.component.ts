import { Component, inject, input, InputSignal, OnChanges, OnDestroy, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { IComment } from '../../interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnChanges, OnDestroy {
  subscription: Subscription = new Subscription();
  private readonly commentsService = inject(CommentsService);
  comments: WritableSignal<IComment[]> = signal([]);
  postId: InputSignal<string> = input.required();
  ngOnChanges(): void {
    this.subscription = this.commentsService.getPostComments(this.postId()).subscribe({
      next: (res) => {
        this.comments.set(res.comments);
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
