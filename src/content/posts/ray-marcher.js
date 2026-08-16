export const rayMarcherPost = {
  slug: 'building-a-realtime-sdf-ray-marcher',
  title: 'Building a Real-Time SDF Ray Marcher',
  date: '2026-03-01',
  excerpt:
    'How I built a desktop SDF workspace editor with fullscreen ray marching, an ImGui toolset, and NPR stylization. This computer graphics final project serves as the portfolio centerpiece.',
  sections: [
    {
      heading: 'Motivation',
      paragraphs: [
        'I wanted a graphics project that went beyond a single shader demo: something interactive, editable, and grounded in the course concepts we covered. These include distance fields, lighting, materials, shadows, and non-photorealistic rendering.',
        'The result is a native C++/OpenGL desktop application that treats signed distance functions as first-class scene objects, rendered every frame through a fullscreen ray marcher.',
      ],
    },
    {
      heading: 'Pipeline overview',
      paragraphs: [
        'The host application handles input, scene graph management, ImGui panels, and OpenGL state. Each frame, a fullscreen quad invokes a fragment shader that marches camera rays through the combined SDF scene.',
        'Analytic primitives (sphere, box, prism) use exact distance evaluations where possible. Deformed meshes fall back to triangle-based distance queries. The floor is marched separately from objects to avoid grazing-ray artifacts near silhouettes.',
      ],
      code: `// Conceptual loop (simplified)
for each pixel ray:
  t = 0
  while t < maxDistance:
    p = origin + t * direction
    d = sceneSDF(p)
    if d < epsilon: shade and break
    t += d * stepScale  // over-relaxed sphere tracing`,
    },
    {
      heading: 'Editor architecture',
      paragraphs: [
        'The workspace is split into Hierarchy, Inspector, Environment and Lights, and Stylization tabs. Selection, transform gizmos, undo/redo, and multi-object grouping mirror small-engine editor workflows.',
        'Scenes serialize to .sdfscene files; individual objects export as .sdfobject. This made iteration fast during development and gives reviewers a clear artifact beyond screenshots.',
      ],
      note: 'TODO: add editor UI screenshot when available',
    },
    {
      heading: 'Why ray marching for SDFs',
      paragraphs: [
        'Triangle rasterization would require meshing or dual representations for CSG and smooth blends. Ray marching evaluates the scene SDF directly along each view ray, so union, subtraction, smooth min-blends, and soft shadows become natural shader extensions.',
        'The tradeoff is GPU cost: full-screen marching with multiple lights, ambient occlusion, and ink outlines adds up. Hybrid analytic paths for undeformed primitives keep common cases fast.',
      ],
    },
    {
      heading: 'Next steps',
      paragraphs: [
        'Demo recordings and gallery images are coming soon. Until then, clone the repository and build locally. Instructions are in the README.',
      ],
      link: {
        label: 'View on GitHub',
        href: 'https://github.com/MajdIssaDev/realtime-sdf-renderer',
      },
    },
  ],
}
