import { world } from "@minecraft/server";
// You can blacklist another projectiles by adding new strings here (eg: "ag:splash_health_potion") ;).
const BlackListedProjectiles = [
    "minecraft:snowball",
    "minecraft:potion",
    "minecraft:splash_potion",
    "minecraft:egg",
    "minecraft:fishing_hook"
]; 
world.events.entityHurt.subscribe((arg) => {
    if (!arg.damageSource.damagingProjectile || arg.hurtEntity?.typeId != "minecraft:player" || arg.damageSource.damagingEntity?.typeId != "minecraft:player" || arg.hurtEntity?.name != arg.damageSource.damagingEntity?.name || BlackListedProjectiles.includes(arg.damageSource.damagingProjectile?.typeId)) {
        return;
    };
    arg.damageSource.damagingEntity.playSound("random.orb", { volume: 0.5, pitch: 0.5 });
});