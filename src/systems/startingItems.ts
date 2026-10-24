import { mp } from "../mp";
import { FormId } from "../types/mp";

// FormIds
const GOLD = 0x0000000F;
const PICKAXE = 0x000E3C16; 
const WOODCUTTER_AXE = 0x0002F2F4;
const MINER_CLOTHES = 0x00080697;
const MINER_BOOTS = 0x00080699;


// Give starting items to the character when they first spawn in the game.
export function giveStartingItems(actorId: FormId): void {
  console.log("[startingItems] Called for actor", actorId.toString(16));

  mp.set(actorId, "inventory", {
    entries: [
      { baseId: GOLD, count: 100 },
      { baseId: PICKAXE, count: 1 },
      { baseId: WOODCUTTER_AXE, count: 1 },
      { baseId: MINER_CLOTHES, count: 1 , worn: true},
      { baseId: MINER_BOOTS, count: 1 , worn: true},
    ],
  });
}