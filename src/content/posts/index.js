import { rayMarcherPost } from './ray-marcher.js'
import { nprShaderPost } from './npr-shader.js'

export const posts = [rayMarcherPost, nprShaderPost]

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
