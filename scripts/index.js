import { world } from "@minecraft/server";
world.events.projectileHit.subscribe((arg) => {
    if (arg.entityHit?.entity.typeId != "minecraft:player" || arg.source.typeId != "minecraft:player" || arg.entityHit?.entity.name == arg.source.name) {
        return;
    };
    arg.source.playSound("random.orb", { volume: 0.5, pitch: 0.5 });
});