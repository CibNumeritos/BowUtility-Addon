import { world } from "@minecraft/server";
// You can blacklist another projectiles by adding new strings here (eg: "ag:splash_health_potion") ;).
const BlackListedProjectiles = [
    "minecraft:snowball",
    "minecraft:potion",
    "minecraft:splash_potion",
    "minecraft:egg",
    "minecraft:fishing_hook"
]; 
world.events.projectileHit.subscribe((arg) => {
    if (arg.entityHit?.entity.typeId != "minecraft:player" || arg.source.typeId != "minecraft:player" || arg.entityHit?.entity.name == arg.source.name || BlackListedProjectiles.includes(arg.projectile.typeId)) {
        return;
    };
    arg.source.playSound("random.orb", { volume: 0.5, pitch: 0.5 });
});
