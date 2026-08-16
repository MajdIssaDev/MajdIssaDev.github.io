export const projects = [
  {
    id: 'sdf-renderer',
    slug: 'realtime-sdf-renderer',
    title: 'Realtime SDF Renderer',
    featured: true,
    hook: 'A real-time C++/OpenGL workspace editor for ray-marched signed distance fields with NPR stylization.',
    description:
      'Native desktop SDF scene editor with fullscreen GLSL ray marching, CSG, smooth blending, multi-light shadows, and non-photorealistic shading modes including cel, Gooch, halftone, and ink outlines.',
    github: 'https://github.com/MajdIssaDev/realtime-sdf-renderer',
    demoNote: 'Desktop app — clone and build locally with CMake and vcpkg.',
    videoSrc: null,
    posterSrc: null,
    embedUrl: null,
    gallery: [],
    highlights: [
      'Fullscreen GLSL ray marcher with over-relaxed sphere tracing',
      'Editable SDF primitives, node networks, and smooth-blend CSG',
      'Multi-light soft shadows, fog, and material controls',
      'NPR modes: cel shading, Gooch, MatCap, halftone, ink outlines',
      'ImGui editor with scene save/load and transform gizmos',
    ],
    tech: ['C++17', 'OpenGL 3.3', 'GLSL', 'GLFW', 'ImGui', 'glm', 'CMake'],
  },
  {
    id: 'gladiator',
    slug: 'project-gladiator',
    title: 'Project Gladiator',
    featured: false,
    hook: 'A souls-like 3D combat prototype exploring state-driven animation sync and parry timing in Unity.',
    description:
      'High-performance 3D action-RPG prototype with frame-synced parrying, dynamic weapon swapping via AnimatorOverrideControllers, and energy-gated combat.',
    github: 'https://github.com/MajdIssaDev/GameEngineUnity-Project-GladiatorGame-V1',
    demoNote: 'Source available on GitHub. No playable build — watch the combat demo clip.',
    videoSrc: null,
    posterSrc: null,
    embedUrl: 'https://medal.tv/games/screen-capture/clips/m7jJwNLp0eYWWFBxI?invite=cr-MSxxWkMsMTg3NjQzNTA1&v=15',
    gallery: [],
    highlights: [
      'State-driven combat FSM with light, heavy, and block transitions',
      'Coroutine-synced parry window aligned to shield animation frames',
      'Runtime weapon hot-swap via AnimatorOverrideControllers',
      'TrySpendEnergy pattern preventing combat spam',
    ],
    tech: ['Unity', 'C#', 'Animator', 'FSM', '3D Combat'],
  },
]

export const featuredProject = projects.find((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
