import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { PostComponent } from "../../shared/components/post/post.component";
import { IPost } from '../../shared/interfaces/ipost';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  imports: [PostComponent, FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  postsList: WritableSignal<IPost[]> = signal([]);
  content: string = '';
  saveImage: any
  private readonly postsService = inject(PostsService);
  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.postsList.set(res.posts);
      }
    })
  }
  savedImg(event: Event): void {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files) {
      this.saveImage = inputFile.files[0];
    }
  }
  addPost(): void {
    const postForm: FormData = new FormData();
    postForm.append('body', this.content);
    postForm.append('image', this.saveImage);
    this.postsService.createPost(postForm).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
