import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { PostService } from '../../shared/components/post/services/post.service';

export const postDetailsResolver: ResolveFn<boolean> = (route, state) => {
  const postService = inject(PostService);
  return postService.getSinglePost(route.paramMap.get('id') as string);
};
