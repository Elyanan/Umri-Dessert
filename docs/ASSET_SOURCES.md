# Asset sources

All food imagery on the site is illustrative. Originals are kept in `assets/originals/`. Locally served WebP derivatives are under `public/images/`. Run `npm run images:optimize` to regenerate the derivatives.

| Served asset | Original | Source |
| --- | --- | --- |
| `hero/chocolate.webp`, `hero/strawberry.webp` | `chocolate.png`, `strawberry.png` | Project-specific OpenAI ImageGen artwork. Alpha channels retained in WebP. |
| `hero/macro.webp` | `macro.png` | Project-specific OpenAI ImageGen artwork. |
| `ingredients/chocolate.webp`, `ingredients/strawberry.webp` | `ingredients.png` | Project-specific OpenAI ImageGen artwork, cropped from an isolated ingredient sheet. |
| `gallery/chocolate.webp`, `gallery/strawberry.webp`, `gallery/coffee.webp` | `editorial.png` | Project-specific OpenAI ImageGen artwork, cropped to separate triptych panels. |
| `gallery/caramel.webp`, `gallery/table.webp`, `gallery/berry-detail.webp`, `gallery/cocoa.webp` | `caramel.png`, `table.png`, `berry-detail.png`, `cocoa.png` | Project-specific OpenAI ImageGen editorial illustrations, optimized locally with a small saturation and sharpness adjustment. |
| `gallery/experience.webp` | `pexels-2144112.jpg` | Quang Nguyen Vinh, [Sliced Cake on White Saucer](https://www.pexels.com/photo/sliced-cake-on-white-saucer-2144112/), [Pexels License](https://www.pexels.com/license/). |

OpenAI-generated artwork is project-specific output under the applicable [OpenAI terms](https://openai.com/policies/terms-of-use/). The Pexels license allows website use and modification. Attribution is appreciated and optional.

Fraunces and DM Sans are bundled through Fontsource and use the SIL Open Font License. The image script generates a small raster grain tile. The ribbon mask and icon paths were drawn for this website.
