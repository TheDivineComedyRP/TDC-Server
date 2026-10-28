/**
 * Types of mp system. This file defines the types and interfaces for the mp system,
 * which is the core of the multiplayer functionality.
 * Could be extended in the future to include more specific types for different systems (characters, items, world objects, etc).
 */

export type FormId = number;
export type Pos = [number, number, number];

export interface Mp {
  // Events Registration
  // Register an object that implements the GamemodeSelf interface to receive event callbacks from the mp system.
  _setSelf(self: GamemodeSelf): void;

  // World Objects
  get(formId: FormId, propertyName: string): unknown;
  set(formId: FormId, propertyName: string, value: unknown): void;
  place(...args: unknown[]): FormId;
  getAllForms(): FormId[];
  lookupEspmRecordById(id: FormId): unknown;
  findFormsByPropertyValue(propertyName: string, value: unknown): FormId[];

  // Actors (Characters) / Players
  createActor(baseId: FormId, pos: Pos, angleZ: number, worldOrCell: FormId, profileId: number): FormId;
  destroyActor(actorId: FormId): void;
  setUserActor(userId: number, actorId: FormId): void;
  getUserActor(userId: number): FormId;
  getUserByActor(actorId: FormId): number;
  getActorsByProfileId(profileId: number): FormId[];
  getActorPos(actorId: FormId): Pos;
  getActorName(actorId: FormId): string;
  setEnabled(formId: FormId, enabled: boolean): void;
  setRaceMenuOpen(actorId: FormId, open: boolean): void;
  isConnected(userId: number): boolean;

  // Custom Data / papyrus
  makeProperty(name: string, settings: unknown): void;
  callPapyrusFunction(...args: unknown[]): unknown;

  // Misc
  getServerSettings(): unknown;


  // Network events / Life cycle events
  on(eventName: "connect" | "disconnect", handler: (userId: number) => void): void;
  on(eventName: "customPacket", handler: (userId: number, content: string) => void): void;
  on(eventName: string, handler: (...args: unknown[]) => void): void;
  sendCustomPacket(userId: number, jsonContent: string): void;


  // Gamemode can optionally provide a hook for player spawn, which will be called by the mp system when a player spawns in the game. 
  onPlayerSpawn?: (userId: number, profileId: number) => void;

}

// The object that implements this interface is registered with the mp system to receive event callbacks.
// The name needs to match the event name expected by the mp system (ex: onActivate, onDropItem, onDeath, etc).
export interface GamemodeSelf {
  onActivate?(target: FormId, caster: FormId): void;
  onDropItem?(actor: FormId, itemId: FormId, count: number): void;
  onTakeItem?(actor: FormId, itemId: FormId, count: number): void;
  onPutItem?(actor: FormId, itemId: FormId, count: number): void;
  onCraft?(...args: unknown[]): void;
  onDeath?(...args: unknown[]): void;
  onEatItem?(...args: unknown[]): void;
  onReadBook?(...args: unknown[]): void;
  onRespawn?(...args: unknown[]): void;
  onUpdateAppearanceAttempt?(...args: unknown[]): void;
  onUpdateEquipmentAttempt?(...args: unknown[]): void;

}