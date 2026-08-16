export const nprShaderPost = {
  slug: 'npr-in-a-ray-marching-shader',
  title: 'NPR in a Ray Marching Shader',
  date: '2026-03-15',
  excerpt:
    'Cel bands, Gooch technical shading, halftone shadows, and ink outlines — stylization modes inside the same SDF ray marcher.',
  sections: [
    {
      heading: 'Stylization as a shader branch',
      paragraphs: [
        'Non-photorealistic rendering fits naturally into the SDF pipeline because shading happens per hit point inside the ray marcher. A master NPR toggle switches between standard Blinn-Phong and stylized branches without changing scene geometry.',
      ],
    },
    {
      heading: 'Modes implemented',
      paragraphs: [
        'Standard with optional cel bands and halftone shadow dots.',
        'Gooch (technical illustration) with warm/cool tone separation.',
        'Wax MatCap for sculpting-preview aesthetics.',
        'Fresnel silhouettes and normal/depth ink outlines for comic-style edge emphasis.',
      ],
      list: [
        'Cel shading bands — discrete lighting quantization',
        'Halftone shadows — screen-space dot pattern in darker regions',
        'Ink outlines — edge detection from normals and depth',
        'Gooch shading — warm/cool technical illustration look',
      ],
    },
    {
      heading: 'More detail coming',
      paragraphs: [
        'This post will expand with shader excerpts and side-by-side captures once demo recordings are ready. The stylization panel in the editor exposes all parameters live for comparison.',
      ],
      note: 'TODO: add NPR mode comparison screenshots when available',
      link: {
        label: 'SDF Renderer repository',
        href: 'https://github.com/MajdIssaDev/realtime-sdf-renderer',
      },
    },
  ],
}
