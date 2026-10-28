import { Mp } from "./types/mp";

// The server defines `globalThis.mp` before running the gamemode.
// export const mp: any = globalThis.mp;    also works,
// but we just give it a type, for having autocomplete and type checking.

export const mp = (globalThis as unknown as { mp: Mp }).mp;