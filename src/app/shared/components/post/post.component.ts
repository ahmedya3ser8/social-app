import { DatePipe } from '@angular/common';
import { Component, inject, input, InputSignal, OnInit, output, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { IComment } from '../../../core/models/icomment';
import { IPost } from '../../../core/models/ipost';
import { CommentComponent } from "../comment/comment.component";
import { CommentService } from './services/comment.service';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-post',
  imports: [CommentComponent, DatePipe, ReactiveFormsModule, Menu, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly commentService = inject(CommentService);
  private readonly postService = inject(PostService);
  post: InputSignal<IPost> = input.required();
  commentMessage: FormControl = new FormControl(null, [Validators.required]);
  postComments: WritableSignal<IComment[]> = signal([]);
  items: MenuItem[] | undefined;
  openModal: WritableSignal<boolean> = signal(false);
  contentControl: FormControl = new FormControl<string | null>(null, [Validators.required]);
  savedFile: WritableSignal<File | null > = signal(null);
  deletedPost = output();
  ngOnInit(): void {
    this.postComments.set(this.post().comments);
    this.contentControl.setValue(this.post().body);
    this.initMenuItems();
  }
  initMenuItems(): void {
    this.items = [
      {
        label: 'Edit',
        icon: 'fa-regular fa-pen-to-square',
        command: () => this.openModal.set(true)
      },
      {
        label: 'Delete',
        icon: 'fa-regular fa-trash-can',
        command: () => this.deletePost()
      }
    ];
  }
  submitForm(): void {
    if (this.commentMessage.valid) {
      console.log(this.commentMessage.value);
      console.log(this.post().id);
      const obj = {
        content: this.commentMessage.value,
        post: this.post().id
      }
      this.commentService.createComment(obj).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.postComments.set(res.comments);
          }
        }
      })
      this.commentMessage.reset();
    } else {
      this.commentMessage.markAsTouched();
    }
  }
  submitUpdatePost(): void {
    if (this.contentControl.valid) {
      console.log(this.contentControl.value);
      console.log(this.savedFile());
      const formData = new FormData();
      formData.append('body', this.contentControl.value);
      formData.append('image', this.savedFile()!);
      this.postService.updatePost(this.post()._id, formData).subscribe({
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
  closeModal(): void {
    this.openModal.set(false);
  }
  changeImage(e: Event): void {
    const file = e.target as HTMLInputElement;
    if (file.files && file.files.length > 0) {
      this.savedFile.set(file.files[0]);
    }
  }
  deletePost(): void {
    this.postService.deletePost(this.post()._id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.deletedPost.emit();
        }
      }
    })
  }
}
