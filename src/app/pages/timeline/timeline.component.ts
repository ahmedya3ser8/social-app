import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../core/services/posts/posts.service';
import { PostComponent } from "../../shared/components/post/post.component";
import { IPost } from '../../shared/interfaces/ipost';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline',
  imports: [PostComponent, FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  postsList: WritableSignal<IPost[]> = signal([]);
  subscriptions: Subscription[] = [];
  content: string = '';
  saveImage: any
  private readonly postsService = inject(PostsService);
  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts(): void {
    this.subscriptions.push(this.postsService.getAllPosts().subscribe({
      next: (res) => {
        if (res.message === "success") {
          this.postsList.set(res.posts);
        }
      }
    }))
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
    this.subscriptions.push(this.postsService.createPost(postForm).subscribe({
      next: (res) => {
        if (res.message === "success") {
          this.openModel();
        }
      }
    }))
  }
  openModel(): void {
    this.isOpen ? this.isOpen = false : this.isOpen = true;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
