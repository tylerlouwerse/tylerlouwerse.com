export interface Post {
  uuid: string;
  title: string;
  slug: string;
  body?: string;
  teaser?: string;
  published: boolean;
}