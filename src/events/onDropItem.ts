import { FormId } from "../types/mp";


export function onDropItem(actor: FormId, itemId: FormId, count: number): void {
  console.log("[onDropItem]", actor.toString(16), "dropped", itemId.toString(16), "x" + count);
  // TODO: Implement item drop logic, such as removing the item from the actor's inventory and placing it in the world.
}