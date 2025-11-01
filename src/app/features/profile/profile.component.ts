import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostService } from '../../shared/components/post/services/post.service';
import { AuthService } from '../auth/services/auth.service';
import { IPost } from '../../core/models/ipost';
import { PostComponent } from "../../shared/components/post/post.component";

@Component({
  selector: 'app-profile',
  imports: [PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly authService = inject(AuthService);
  postList: WritableSignal<IPost[]> = signal([]);
  ngOnInit(): void {
    this.getUserPosts();
  }
  getUserPosts(): void {
    this.postService.getUserPosts(this.authService.tokenData().user).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.postList.set(res.posts)
        }
      }
    })
  }
}
