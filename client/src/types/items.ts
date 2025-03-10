interface PassiveActiveStat {
  value: number;
  valueType: string,
  symbol: "weapon" | "spirit" | "firerate" | "health" | "resist-spirit" | "resist-weapon" | null
  scaling: number;
  scalingType: "spiritPower" | "range" | "duration" | "cooldown" | null;
  text: string;
  textColor: "weapon" | "spirit" | "health" | null;
  textType: "general" | "extra";
  conditional: boolean;
}

interface PassiveAndActive {
  description: string;
  cooldown: number | null;
  statPanel: {
    generalStats: PassiveActiveStat[],
    extraStats:  PassiveActiveStat[],
  };
}

export interface Item {
  name: string;
  description: string | null;
  stats: {
    reloadTime: number,
    weaponFallOffRange: number,
    weaponZoom: number,
    fireRate: number,
    bonusHealth: number,
    meleeDamage: number,
    bulletResist: number,
    spiritResist: number,
    moveSpeed: number,
    sprintSpeed: number,
    weaponDamage: number,
    spiritPower: number,
    spiritShieldHealth: number,
    bulletShieldHealth: number,
    healthRegen: number,
    abilityDuration: number,
    abilityRange: number,
    cooldownReduction: number,
    ammo: number,
  };
}