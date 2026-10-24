/**
 * Main Entry Point for the Gamemode. This file initializes the gamemode, sets up event handlers,
 * and defines the main logic for player interactions and character management.
 */


import { mp } from "./mp";
import { GamemodeSelf } from "./types/mp";
import { onActivate } from "./events/onActivate";
import { onDropItem } from "./events/onDropItem";
import { onDeath } from "./events/onDeath";
import { onRespawn } from "./events/onRespawn";

const userProfiles = new Map<number, number>(); // userId -> profileId



console.log("Gamemode has started!");


/**
 * Grouping all event handlers in a single object that implements the GamemodeSelf interface.
 * This object is registered with the mp system to receive event callbacks.
 * Each method corresponds to a specific event that can occur in the game, such as activating an object, dropping an item, or dying.
 * The mp system will call the appropriate method on this object when the corresponding event occurs in the game.
 */

const self: GamemodeSelf = {
  onActivate,
  onDropItem,
  onDeath,
  onRespawn,
};

/**
 * Register the self object with the mp system to start receiving event callbacks. 
 * This is essential for the gamemode to function,
 * as it allows the gamemode to react to in-game events and implement custom logic based on those events.
 */

mp._setSelf(self);




/**
 * Player spawn event handler. This is called when a player spawns in the game.
 * @param userId the userId of the player who spawned.
 * @param profileId the profileId of the player who spawned. 
 */

mp.onPlayerSpawn = (userId, profileId) => {
  console.log("[onPlayerSpawn] userId:", userId, "profileId:", profileId);
  userProfiles.set(userId, profileId);
};

/**
 * Shows the player connection event. This logs the userId of the player who connected.
 */

mp.on("connect", (userId) => {
  console.log("[connect] Player connected with userId =", userId);
});