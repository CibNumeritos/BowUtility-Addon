import { world } from "@minecraft/server";
// You can blacklist another projectiles by adding new strings here (eg: "ag:splash_health_potion") ;).
const AllowedProjectiles = ["minecraft:arrow", "minecraft:thrown_trident"];
world.afterEvents.projectileHitEntity.subscribe((arg) => {
  const hitEntity = arg.getEntityHit()?.entity;
  const { projectile, source } = arg;
  if (
    hitEntity?.typeId != "minecraft:player" ||
    source?.typeId != "minecraft:player" ||
    !AllowedProjectiles.includes(projectile.typeId) ||
    hitEntity.id === source.id
  ) {
    return;
  }
  source.runCommand("playsound random.orb ~ ~ ~ @s 1 0.5 1 ");
});
