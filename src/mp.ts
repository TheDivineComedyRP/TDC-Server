import { Mp } from "./types/mp";

// The server defines `globalThis.mp` before running the gamemode.
// Here we just give it a type, for having autocomplete.
export const mp = (globalThis as unknown as { mp: Mp }).mp;
