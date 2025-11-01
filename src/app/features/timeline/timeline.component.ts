import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { PostComponent } from "../../shared/components/post/post.component";
import { PostService } from '../../shared/components/post/services/post.service';
import { IPost } from '../../core/models/ipost';

@Component({
  selector: 'app-timeline',
  imports: [ReactiveFormsModule, PostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  private readonly postService = inject(PostService);
  openModal: WritableSignal<boolean> = signal(false);
  savedFile: WritableSignal<File | null > = signal(null);
  contentControl: FormControl = new FormControl<string | null>(null, [Validators.required]);
  postsList: WritableSignal<IPost[]> = signal([]);
  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.postsList.set(res.posts);
      }
    })
  }
  toggleModal(): void {
    this.openModal.update(v => !v);
  }
  closeModal(): void {
    this.contentControl.reset();
    this.savedFile.set(null);
    this.openModal.set(false);
  }
  changeImage(e: Event): void {
    const file = e.target as HTMLInputElement;
    if (file.files && file.files.length > 0) {
      this.savedFile.set(file.files[0]);
    }
  }
  submitForm(): void {
    if (this.contentControl.valid) {
      console.log(this.contentControl.value);
      console.log(this.savedFile());
      const formData = new FormData();
      formData.append('body', this.contentControl.value);
      formData.append('image', this.savedFile()!);
      this.postService.createPost(formData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.closeModal();
          }
        }
      })
    } else {
      this.contentControl.markAsTouched();
    }
  }
}
