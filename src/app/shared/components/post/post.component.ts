import { Component, input, InputSignal } from '@angular/core';
import { IPost } from '../../interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentComponent } from "../comment/comment.component";
import { CreateCommentComponent } from "../create-comment/create-comment.component";

@Component({
  selector: 'app-post',
  imports: [DatePipe, CommentComponent, CreateCommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post: InputSignal<IPost> = input.required<IPost>();
}
