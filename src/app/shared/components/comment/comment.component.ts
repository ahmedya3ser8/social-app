import { DatePipe } from '@angular/common';
import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { IComment } from '../../../core/models/icomment';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommentService } from '../post/services/comment.service';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, DatePipe, Menu, FloatLabel, InputTextModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly commentService = inject(CommentService);
  comment: InputSignal<IComment> = input.required();
  items: MenuItem[] | undefined;
  form!: FormGroup;
  openModal: WritableSignal<boolean> = signal(false);
  commentData: WritableSignal<IComment> = signal({} as IComment);
  ngOnInit(): void {
    this.initMenuItems();
    this.commentData.set(this.comment())
    this.initForm();
    console.log(this.comment());
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
        command: () => this.deleteComment()
      }
    ];
  }
  initForm(): void {
    this.form = this.fb.group({
      content: [this.commentData().content, [Validators.required]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.commentService.updateComment(this.commentData()._id, this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.commentData.set(res.comment);
            this.closeModal();
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
  isFieldInvalid(field: string): boolean {
    const control: AbstractControl | null = this.form.get(field);
    return !!(control?.errors && control?.touched);
  }
  closeModal(): void {
    this.openModal.set(false);
  }
  deleteComment(): void {
    console.log(this.commentData()._id);
    this.commentService.deleteComment(this.commentData()._id).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
