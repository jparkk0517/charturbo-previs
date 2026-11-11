# charturbo-previs

Previs for AI video. You block out a shot with flat-color mannequins, props and glTF characters, using a JSON
timeline doc (camera, motion, cuts). Then you preview it in the browser and render it to video (mp4 / PNG frames,
plus optional depth and textured passes). The result serves as the camera, motion and timing reference for one
paid AI video generation. `buildHandoff` writes the matching upload order and prompt.

Rendering uses the [Charturbo](https://github.com/jparkk0517/Charturbo) 3D engine (`charturbo` package). This repo
was split out of the Charturbo monorepo with its history; it uses only the public `charturbo` API.

## Requirements

- Node 22 (see `volta` / `engines` in `package.json`)
- `charturbo` ^0.1.0. It is **not on npm yet**. Until it is published, install a local build:
  `npm install --no-save <path to charturbo-0.1.0.tgz>` (from `npm pack` in Charturbo's `web/`).
- Rendering: Chrome (or `CHROME_PATH`) and, for mp4 output, ffmpeg

## Layout

| path | contents |
| --- | --- |
| `src/` | the library: doc types, evaluator, validator, mannequin builder, retargeting, handoff, player |
| `app/` | browser viewer (`viewer.html`) and offline render page (`render.html`) sources |
| `scripts/` | `render.mjs` (doc -> video), `check.mjs` / `check-textured.mjs` (render regressions), `new.mjs` (generator scaffold) |
| `examples/` | example docs, their generators (`*.gen.ts`) and models (see the README / LICENSE files next to each model set) |
| `test/` | vitest suite |
| `docs/guide.md` | full reference |
| `SKILL.md` | agent skill: from a reference video to a previs doc and handoff |

## Commands

```bash
npm test                                                     # vitest
npm run typecheck                                            # tsc
npm run previs:viewer                                        # browser viewer (vite dev server)
npm run previs:render -- examples/street-walk.json out.mp4   # render a doc
npm run previs:render -- doc.json --still=1.5 --out=t.png    # one preview frame
npm run previs:new -- my-scene                               # scaffold examples/my-scene.gen.ts
node --experimental-strip-types examples/gate-raid.gen.ts    # regenerate an example doc
npm run previs:check                                         # palette regression (needs Chrome)
npm run previs:check-textured                                # textured pass checks (needs Chrome)
```

See `docs/guide.md` for the doc format and every render option.
