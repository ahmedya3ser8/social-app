import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPost } from '../../core/models/ipost';
import { PostComponent } from "../../shared/components/post/post.component";

@Component({
  selector: 'app-post-details',
  imports: [PostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  postId: WritableSignal<string> = signal('');
  post: WritableSignal<IPost> = signal({} as IPost);
  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: ({ postData }) => {
        console.log(postData);
        if (postData.message === 'success') {
          this.post.set(postData.post)
        }
      }
    })
  }
}
