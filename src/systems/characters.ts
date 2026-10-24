/**
 * Character Management System for the Multiplayer Game.
 * This module provides functions to create, delete, list, and select characters associated with a player's profile.
 */


import { mp } from "../mp";
import { FormId, Pos } from "../types/mp";


export const MAX_CHARACTERS = 2;


/**
 * Lists the characters associated with a profile. This is used by the UI to show the list of characters.
 * @param profileId the profileId of the user whose characters are to be listed.
 * @returns Array of FormIds representing the characters associated with the profile.
 */

export function listCharacters(profileId: number): FormId[] {
  return mp.getActorsByProfileId(profileId);
}




/**
 *  Auxiliar function to check if a profile can create a new character based on the maximum allowed characters.
 * @param profileId the profileId of the user trying to create a new character.
 * @returns boolean indicating if the profile can create a new character. 
 */

export function canCreateCharacter(profileId: number): boolean {
  return listCharacters(profileId).length < MAX_CHARACTERS;
}



/**
 * The character creation has a limit of 2 characters per profile. This function checks if the profile can create a new character.
 * @param profileId the profileId of the user trying to create a new character.
 * @param pos the position where the new character will be placed in the world.
 * @param angleZ the angle of the new character in the world.
 * @param worldOrCell the world or cell where the new character will be placed.
 * @returns formId of the newly created character. Throws an error if the limit is reached.
 */


export function createCharacter(profileId: number, pos: Pos, angleZ: number, worldOrCell: FormId): FormId {
  if (!canCreateCharacter(profileId)) {
    throw new Error(`Limit of ${MAX_CHARACTERS} characters reached`);
  }

  return mp.createActor(0, pos, angleZ, worldOrCell, profileId);
}



/**
 * Delete a character (actorId) and remove its association with the profile.
 * @param actorId the formId of the character to delete.
 */
export function deleteCharacter(actorId: FormId): void {
  mp.set(actorId, "profileId", 0);
  mp.destroyActor(actorId);
}

/**
 * Allows a user to select a character (actorId) and set it as the active character for the user (userId).
 * @param userId the userId of the player selecting the character.
 * @param actorId the formId of the character to select. This character will be enabled and associated with the user.
 * @param profileId the profileId of the user selecting the character. This is used to disable other characters associated with the profile.
 */
export function selectCharacter(userId: number, actorId: number, profileId: number) {
  const chars = listCharacters(profileId);

  for (const c of chars) {
    if (c !== actorId) {
      mp.setEnabled(c, false);
    }
  }
  
  mp.setEnabled(actorId, true);
  mp.setUserActor(userId, actorId);
}





/**
 * Switches to the next character for a user. If the user has multiple characters (2 max),
 * this function will cycle through them.
 * @param userId the userId of the player switching characters.
 * @param currentActorId the formId of the currently active character.
 * @returns void
 */
export function switchToNextCharacter(userId: number, currentActorId: FormId): void {
  const profileId = mp.get(currentActorId, "profileId") as number;
  const chars = listCharacters(profileId);

  if (chars.length < 2) return;

  const actual = chars.indexOf(currentActorId);
  const next = (actual + 1) % chars.length;
  selectCharacter(userId, chars[next], profileId);
}