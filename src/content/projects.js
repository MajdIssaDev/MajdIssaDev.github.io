import routeMap from '../assets/delivery/route-map-v2.png'
import assignedDeliveries from '../assets/delivery/assigned-deliveries-v2.png'
import dispatchWorkers from '../assets/delivery/dispatch-workers-v2.png'
import ordersPending from '../assets/delivery/orders-pending-v2.png'
import demandHeatmap from '../assets/delivery/demand-heatmap-v2.png'
import rayMarchTraditional from '../assets/sdf/ray-march-traditional.png'
import rayMarchRollback from '../assets/sdf/ray-march-rollback.png'

export const projects = [
  {
    id: 'sdf-renderer',
    slug: 'realtime-sdf-renderer',
    title: 'Realtime SDF Renderer',
    featured: true,
    hook: 'A real-time C++/OpenGL workspace editor for ray-marched signed distance fields with NPR stylization.',
    keyFeatureLabel: 'Modified ray marching',
    keyFeature:
      'The renderer uses over-relaxed sphere tracing (omega = 1.6) with rollback when a step overshoots the surface, giving faster convergence than standard sphere tracing while remaining stable. Objects and the analytic floor are marched separately, with a distance cap at the floor intersection so rays do not terminate early or skip geometry near silhouettes. Exact ellipsoid and non-uniform box distances keep stretched primitives reliable. On the shading side, soft shadows, ambient occlusion, multi-light response, and material controls produce a viewport that reads closer to a production engine than a basic SDF demo.',
    description:
      'Native desktop SDF scene editor with fullscreen GLSL ray marching, CSG, smooth blending, and non-photorealistic modes including cel, Gooch, halftone, and ink outlines.',
    github: 'https://github.com/MajdIssaDev/realtime-sdf-renderer',
    demoNote: 'Desktop application. Clone and build locally with CMake and vcpkg.',
    videoSrc: null,
    posterSrc: null,
    embedUrl: null,
    mediaAspect: 'video',
    compare: {
      before: rayMarchTraditional,
      after: rayMarchRollback,
      beforeLabel: 'Standard ray marching',
      afterLabel: 'My modified ray marching',
    },
    gallery: [],
    highlights: [
      'Rollback on overshoot keeps picking aligned with the rendered surface',
      'Separate object and floor marching avoids grazing-ray clipping',
      'Hybrid analytic and mesh SDF paths for boxes, prisms, and deformed geometry',
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
    keyFeatureLabel: 'Animation-synced parrying',
    keyFeature:
      'The core mechanic is a frame-aligned parry: blocking logic is delayed through a coroutine so the gameplay hitbox activates when the shield animation reaches the intended frame, not on the raw input frame. A combat FSM with state priority prevents input conflicts and animation cancels, while TrySpendEnergy gates heavy attacks to keep timing deliberate.',
    description:
      'High-performance 3D action-RPG prototype with dynamic weapon swapping via AnimatorOverrideControllers and energy-gated combat.',
    github: 'https://github.com/MajdIssaDev/GameEngineUnity-Project-GladiatorGame-V1',
    demoNote: 'Source available on GitHub. No playable build. Combat clip shows block, parry, light attack, heavy attack, and end of round.',
    videoSrc: '/assets/gladiator-demo.mp4',
    posterSrc: null,
    embedUrl: null,
    mediaAspect: 'video',
    gallery: [],
    highlights: [
      'State-driven combat FSM for light, heavy, and block transitions',
      'Runtime weapon hot-swap via AnimatorOverrideControllers',
      'Modular WeaponDamage and ICombatReceiver architecture',
    ],
    tech: ['Unity', 'C#', 'Animator', 'FSM', '3D Combat'],
  },
  {
    id: 'delivery-platform',
    slug: 'mobile-delivery-platform',
    title: 'Mobile Delivery Platform',
    featured: false,
    hook: 'Production Flutter software for multi-stop delivery routing and a consumer storefront.',
    keyFeatureLabel: 'Split client architecture',
    keyFeature:
      'The product splits a driver routing application from a consumer storefront, each with its own API surface. The driver app handles multi-stop optimization, live map interaction, and turn-by-turn voice guidance. The consumer app handles catalog, cart, and phone OTP checkout. A dedicated backend proxy holds sensitive keys and exposes scoped routes so mobile clients never call privileged services directly.',
    description:
      'Full-stack mobile product with interactive maps, route optimization, traffic overlays, and a separate consumer application for catalog browsing and checkout.',
    github: null,
    demoNote: 'Private repository. Commercial project.',
    videoSrc: null,
    posterSrc: routeMap,
    embedUrl: null,
    mediaAspect: 'portrait',
    gallery: [routeMap, assignedDeliveries, dispatchWorkers, ordersPending, demandHeatmap],
    highlights: [
      'Multi-stop route optimization with flutter_map and OpenRouteService',
      'Supabase phone OTP for verified checkout',
      'Cloud Run proxy for catalog, orders, and Places integration',
      'CI with flutter analyze, format checks, and GitHub Actions',
    ],
    tech: ['Flutter', 'Dart', 'Supabase', 'Node.js', 'Cloud Run', 'Maps APIs'],
  },
]

export const featuredProject = projects.find((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
