declare namespace App {
  export interface Post {
    uuid: string
    slug: string
    title: string
    body?: string
    teaser?: string
    published: boolean
  }
}
