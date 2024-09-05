declare namespace App {
  export interface Post {
    uuid: string
    tag: string
    slug: string
    title: string
    reading_mins: number
    body?: string
    teaser?: string
    published: boolean
    published_at?: string
  }
}
