class damage {
    constructor() { }

    uuid = crypto.randomUUID();

    inputEnemy = null;
    inputServant = null;
    inputCalc = null;

    TriangleMod = null;
    AttributeMod = null;

    svtAtkConfig = 0;
    cardConfig = 0;
    atkConfig = 0;
    powerConfig = 0;
    npConfig = 0;
    specialDefConfig = 0;
    NpEffectivenessConfig = 0;

    ServantAttack = null;
    NPValue = null;
    ScalingHpMod = null;
    ClassMod = null;
    CardMod = null;
    CardTypeMode = null;
    CardResistanceMod = null;
    RandomMod = null;
    Const = null;
    AttackMod = null
    DefenceMod = null
    SpecialDefMod = null;
    PowerMod = null;
    NpPowerMod = null;
    SuperModValue = null;
    NPEffectivenessMod = null;

    FormulaValues = null;
    CalculatedDamage = 0.0;

    TotalCardMod = null;
    TotalAttackMod = null;
    TotalNpMod = null;
    TotalPowerNpMod = null;

    MiscAttackRating = 0;

    calculate() {
        this.TotalCardMod = (1 + this.CardMod - this.CardResistanceMod);
        this.TotalAttackMod = (1 + this.AttackMod - this.DefenceMod);
        this.TotalNpMod = this.NpPowerMod * this.NPEffectivenessMod;
        this.TotalPowerNpMod = (1 + this.PowerMod + this.TotalNpMod);

        this.FormulaValues = {
            ServantAttack: this.ServantAttack,
            NPValue: this.NPValue,
            ScalingHpMod: this.ScalingHpMod,
            ClassMod: this.ClassMod,
            CardTypeMode: this.CardTypeMode,
            TotalCardMod: this.TotalCardMod,
            TriangleMod: this.TriangleMod,
            AttributeMod: this.AttributeMod,
            RandomMod: this.RandomMod,
            Const: this.Const,
            TotalAttackMod: this.TotalAttackMod,
            SpecialDefMod: this.SpecialDefMod,
            TotalPowerNpMod: this.TotalPowerNpMod,
            SuperModValue: this.SuperModValue
        };

        this.CalculatedDamage =
            this.ServantAttack
            * this.NPValue
            * this.ScalingHpMod
            * this.ClassMod
            * this.CardTypeMode
            * this.TotalCardMod 
            * this.TriangleMod
            * this.AttributeMod
            * this.RandomMod
            * this.Const
            * this.TotalAttackMod
            * this.SpecialDefMod
            * this.TotalPowerNpMod
            * this.SuperModValue
            ;        
        this.CalculatedDamage = Math.round(this.CalculatedDamage);

        this.MiscAttackRating = Math.round(this.ServantAttack * this.ClassMod);    
            
        return this;
    }

    /*
    static CalculateDamage(servant, enemy, calc, supportConfiguration) {
        let damageCalculationObject = new damage();

        damageCalculationObject.inputServant = servant;
        damageCalculationObject.inputEnemy = enemy
        damageCalculationObject.inputCalc = calc;

        damageCalculationObject.TriangleMod = parseFloat(getTriangleMod(servant, enemy));
        damageCalculationObject.AttributeMod = parseFloat(getAttributeMod(servant, enemy));

        //config
        damageCalculationObject.svtAtkConfig = supportConfiguration.servantAttackBonus;
        damageCalculationObject.cardConfig = supportConfiguration.cardBonus;
        damageCalculationObject.atkConfig = supportConfiguration.attackBonus;
        damageCalculationObject.powerConfig = supportConfiguration.powerBonus;
        damageCalculationObject.npConfig = supportConfiguration.NpBonus;
        damageCalculationObject.specialDefConfig = supportConfiguration.SpecialDefence;
        damageCalculationObject.NpEffectivenessConfig = supportConfiguration.NPEffectivenessUp;

        damageCalculationObject.ServantAttack = parseInt(calc.ServantAtk) + parseInt(damageCalculationObject.svtAtkConfig);
        damageCalculationObject.NPValue = parseFloat(calc.NpValue);
        damageCalculationObject.ScalingHpMod = parseFloat(calc.ScalingHpMod);
        damageCalculationObject.ClassMod = parseFloat(calc.ClassMod);
        damageCalculationObject.CardMod = parseFloat(calc.CardMod) + parseFloat(damageCalculationObject.cardConfig);
        damageCalculationObject.CardTypeMode = parseFloat(calc.CardTypeMode);
        damageCalculationObject.CardResistanceMod = parseFloat(calc.CardResistanceMod);
        damageCalculationObject.RandomMod = parseFloat(calc.RandomMod);
        damageCalculationObject.Const = parseFloat(calc.Const);
        damageCalculationObject.AttackMod = parseFloat(calc.AttackMod) + parseFloat(damageCalculationObject.atkConfig);
        damageCalculationObject.DefenceMod = parseFloat(calc.DefenceMod);
        damageCalculationObject.SpecialDefMod = parseFloat(calc.SpecialDefMod) - parseFloat(damageCalculationObject.specialDefConfig);
        damageCalculationObject.PowerMod = parseFloat(calc.PowerMod) + parseFloat(damageCalculationObject.powerConfig);
        damageCalculationObject.NpPowerMod = parseFloat(calc.NpPowerMod) + parseFloat(damageCalculationObject.npConfig);
        damageCalculationObject.SuperModValue = parseFloat(calc.SuperModValue);
        damageCalculationObject.NPEffectivenessMod = Math.min(2, 1 + parseFloat(calc.NPEffectivenessMod) + parseFloat(damageCalculationObject.NpEffectivenessConfig));

        return damageCalculationObject.calculate();
    }
    */

    static CalculateDamage(servant, enemy, calc, supportConfigurations) {
        let damageCalculationObject = new damage();

        damageCalculationObject.inputServant = servant;
        damageCalculationObject.inputEnemy = enemy
        damageCalculationObject.inputCalc = calc;

        damageCalculationObject.TriangleMod = parseFloat(getTriangleMod(servant, enemy));
        damageCalculationObject.AttributeMod = parseFloat(getAttributeMod(servant, enemy));

        
        supportConfigurations.forEach((item) => {
            damageCalculationObject.svtAtkConfig += item.servantAttackBonus;
            damageCalculationObject.cardConfig += item.cardBonus;
            damageCalculationObject.atkConfig += item.attackBonus;
            damageCalculationObject.powerConfig += item.powerBonus;
            damageCalculationObject.npConfig += item.NpBonus;
            damageCalculationObject.specialDefConfig += item.SpecialDefence;
            damageCalculationObject.NpEffectivenessConfig += item.NPEffectivenessUp;
        });

        damageCalculationObject.ServantAttack = parseInt(calc.ServantAtk) + parseInt(damageCalculationObject.svtAtkConfig);
        damageCalculationObject.NPValue = parseFloat(calc.NpValue);
        damageCalculationObject.ScalingHpMod = parseFloat(calc.ScalingHpMod);
        damageCalculationObject.ClassMod = parseFloat(calc.ClassMod);
        damageCalculationObject.CardMod = parseFloat(calc.CardMod) + parseFloat(damageCalculationObject.cardConfig);
        damageCalculationObject.CardTypeMode = parseFloat(calc.CardTypeMode);
        damageCalculationObject.CardResistanceMod = parseFloat(calc.CardResistanceMod);
        damageCalculationObject.RandomMod = parseFloat(calc.RandomMod);
        damageCalculationObject.Const = parseFloat(calc.Const);
        damageCalculationObject.AttackMod = parseFloat(calc.AttackMod) + parseFloat(damageCalculationObject.atkConfig);
        damageCalculationObject.DefenceMod = parseFloat(calc.DefenceMod);
        damageCalculationObject.SpecialDefMod = parseFloat(calc.SpecialDefMod) - parseFloat(damageCalculationObject.specialDefConfig);
        damageCalculationObject.PowerMod = parseFloat(calc.PowerMod) + parseFloat(damageCalculationObject.powerConfig);
        damageCalculationObject.NpPowerMod = parseFloat(calc.NpPowerMod) + parseFloat(damageCalculationObject.npConfig);
        damageCalculationObject.SuperModValue = parseFloat(calc.SuperModValue);
        damageCalculationObject.NPEffectivenessMod = Math.min(2, 1 + parseFloat(calc.NPEffectivenessMod) + parseFloat(damageCalculationObject.NpEffectivenessConfig));

        return damageCalculationObject.calculate();
    }
}

//relies on data object
function getTriangleMod(servant, enemy) {
    let item = data.ClassTriangle.find((element) => {
        return (element.Attacker === servant.Class && element.Defender === enemy.Class);
    });

    if (item === undefined)
        return 1.0;

    return item.Value;
}

function getAttributeMod(servant, enemy) {
    let item = data.AttributeTriangle.find((element) => {
        return element.Attacker == servant.Attribute && element.Defender == enemy.Attribute;
    });

    if (item === undefined)
        return 1.0;

    return item.Value;
}

class SupportConfiguration {
    constructor() { }
    static Get(ID, NPType, servantAttackBonus, cardBonus, attackBonus, powerBonus, NpBonus, SpecialDefence, NPEffectivenessUp) {
        let config = new SupportConfiguration();
        config.ID = ID;
        config.NPType = NPType;
        config.servantAttackBonus = servantAttackBonus;
        config.cardBonus = cardBonus / 100.0;
        config.attackBonus = attackBonus / 100.0;
        config.powerBonus = powerBonus / 100.0;
        config.NpBonus = NpBonus / 100.0;
        config.SpecialDefence = SpecialDefence / 100.0;
        config.NPEffectivenessUp = NPEffectivenessUp / 100.0;
        return config;
    }

    ID = null;
    NPType = null;

    servantAttackBonus = 0;
    cardBonus = 0;
    attackBonus = 0;
    powerBonus = 0;
    NpBonus = 0;
    SpecialDefence = 0;
    NPEffectivenessUp = 0;
}