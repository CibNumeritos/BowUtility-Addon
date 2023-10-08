import { world } from "@minecraft/server";
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
  source.runCommand("playsound random.orb @s ~ ~ ~ 1 0.5 1 ");
  const health = hitEntity.getComponent("minecraft:health");
  source.runCommand(
    `titleraw @s actionbar {"rawtext":[{"text":"§e${hitEntity.name} is now at ${
      health.currentValue < 0 ? 0 : (health.currentValue / 2).toFixed(1)
    }/${Math.floor(health.defaultValue / 2)} §lHP"}]}`
  );
});
