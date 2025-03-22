interface PassiveActiveStat {
  value: number;
  valueType: string;
  symbol: "weapon" | "spirit" | "firerate" | "health" | "resist_spirit" | "resist_weapon" | null;
  scaling: number;
  scalingType: "spirit" | "range" | "duration" | "cooldown" | null;
  text: string;
  textColor: "weapon" | "spirit" | "health" | null;
  textType: "general" | "extra";
  conditional: boolean;
}

export interface PassiveAndActive {
  description: string;
  cooldown: number | null;
  statPanel: {
    generalStats: PassiveActiveStat[] | null,
    extraStats:  PassiveActiveStat[] | null,
  };
}

export interface Item {
  name: string;
  description: string | null;
  stats: {
    weapon: {
      bulletDamage: number,
      weaponDamage: number,
      bulletsPerSec: number,
      fireRate: number,
      ammo: number,
      clipSizeIncrease: number,
      reloadTime: number,
      reloadReduction: number,
      bulletVelocity: number,
      bulletVelocityIncrease: number,
      bulletLifesteal: number,
      critBonusScale: number,
      lightMelee: number,
      heavyMelee: number,
      weaponFallOffRange: number,
      weaponZoom: number,
      weaponDamageVsNPCs: number,
    },
    vitality: {
      maxHealth: number,
      healthRegen: number,
      bulletResist: number,
      spiritResist: number,
      bulletShield: number,
      spiritShield: number,
      meleeResist: number,
      healAmp: number,
      debuffResist: number,
      critReduction: number,
      moveSpeed: number,
      sprintSpeed: number,
      staminaCooldown: number,
      staminaRecovery: number,
      stamina: number,
      bulletResistVsNPCS: number,
    },
    spirit: {
      abilityCooldown: number,
      abilityDuration: number,
      abilityRange: number,
      spiritLifesteal: number,
      maxChargesIncrease: number,
      chargeCooldown: number,
      spiritPower: number,
    },
  };
  passive: PassiveAndActive | null;
  active: PassiveAndActive | null;
  componentOf: string | null;
  components: { name: string, tier: number }[] | null;
}

export type StatKeys = keyof Item["stats"]["weapon"] | keyof Item["stats"]["vitality"] | keyof Item["stats"]["spirit"];