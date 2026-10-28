import { mp } from "../mp";
import { canCreateCharacter, createCharacter, deleteCharacter, listCharacters, selectCharacter, switchToNextCharacter } from "../systems/characters";
import { FormId, Pos } from "../types/mp";

export function onActivate(target: FormId, caster: FormId): void {
  console.log("[onActivate] target:", target, "caster:", caster);
  // TODO: Implement activation logic, such as triggering events.


  const profileId = mp.get(caster, "profileId") as number;
  const userId = mp.getUserByActor(caster);

  if (canCreateCharacter(profileId)) {
    createAndSelect(userId, profileId, caster);
  } else {
    //deleteInactive(userId, profileId);
    switchToNextCharacter(userId, caster);
    console.log(`[onActivate] Switching to Character : ${mp.getUserActor(userId).toString(16)}`);
  }

  console.log(`[onActivate] Total Characters: ${listCharacters(profileId).length}`);
}

/** 
 * Creates a new character in the new spawning point for the user,
 * and selects it as the active character.
*/
function createAndSelect(userId: number, profileId: number, caster: FormId): void {

  const settings = mp.getServerSettings() as {
    startPoints: { pos: Pos; worldOrCell: string; angleZ: number }[];
  };
  const spawn = settings.startPoints[0];

  const newCharacter = createCharacter(profileId, spawn.pos as Pos, spawn.angleZ, +spawn.worldOrCell);
  selectCharacter(userId, newCharacter, profileId);
  mp.setRaceMenuOpen(newCharacter, true);
  console.log(`[onActivate] Created and selected: ${newCharacter.toString(16)}`);
}

/** Deletes the inactive character for the user. */
function deleteInactive(userId: number, profileId: number): void {
  const current = mp.getUserActor(userId);
  const inactive = listCharacters(profileId).find((c) => c !== current);

  if (inactive === undefined) {
    console.log("[onActivate] Nothing to delete. Only one character exists.");
    return;
  }
  deleteCharacter(inactive);
  console.log(`[onActivate] Deleted: ${inactive.toString(16)}`);
}