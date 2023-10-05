import { MinecraftEffectTypes, world } from "@minecraft/server";
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
  const health = hitEntity.getComponent("minecraft:health");
  source.runCommand(
    `titleraw @s actionbar {"rawtext":[{"text":"§e${hitEntity.name} is now at ${
      health.current < 0 ? 0 : (health.current / 2).toFixed(1)
    }/${Math.floor(health.value / 2)} §lHP"}]}`
  );
});
