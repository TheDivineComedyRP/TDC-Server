import { build } from "esbuild";


// DEST - Destination: the gamemode.js that the SkyMP server loads.
// Each dev points to THEIR folder via the environment variable, or adjusts here.

const DEST = process.env.SKYMP_GAMEMODE_OUT

if (!DEST) {
  throw new Error("Set the SKYMP_GAMEMODE_OUT environment variable to the output path for the gamemode.js file.");
}

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node16",
  outfile: DEST,
});

console.log("gamemode built ->", DEST);
