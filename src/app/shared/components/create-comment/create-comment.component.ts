import { Component, inject, input, InputSignal, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss'
})
export class CreateCommentComponent implements OnChanges, OnDestroy {
  subscription: Subscription = new Subscription();
  private readonly commentsService = inject(CommentsService);
  postId: InputSignal<string> = input.required();
  commentForm!: FormGroup;
  ngOnChanges(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(null, [Validators.required]),
      post: new FormControl(this.postId())
    })
  }
  submitCommentForm() {
    if (this.commentForm.valid) {
      this.subscription = this.commentsService.createComment(this.commentForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.commentForm.reset();
          }
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
