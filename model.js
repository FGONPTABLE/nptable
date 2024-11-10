function NPLevelReset() {
    document.getElementById("NPLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    })
}

function NPLevelSelectAll() {
    document.getElementById("NPLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    })
}

function NPLevelSelect(level) {
    NPLevelReset();
    document.getElementById("NPLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        if (item.id == "np" + level) {
            item.checked = true;
            return;
        }
    })
}

function OCLevelReset() {
    document.getElementById("OCLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    })
}

function OCLevelSelectAll() {
    document.getElementById("OCLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    })
}

function OCLevelSelect(level) {
    OCLevelReset();
    document.getElementById("OCLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        if (item.id == "OC" + level) {
            item.checked = true;
            return;
        }
    })
}

function LevelFilterReset() {
    document.getElementById("LevelFilter").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    })
}

function LevelFilterSelectAll() {
    document.getElementById("LevelFilter").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    })
}

function LevelFilterSelect(level) {
    LevelFilterReset();
    document.getElementById("LevelFilter").querySelectorAll('input[type=checkbox]').forEach((item) => {
        if ("Include" + level == item.id) {
            item.checked = true;
            return;
        }
    })
}

function TargetFilterReset() {
    document.getElementById("TargetFilter").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    })
}

function TargetFilterSelectAll() {
    document.getElementById("TargetFilter").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    })
}

function ConfigCardValueSet(value) {
    document.getElementById("cardBonus").value = value;
}

function ConfigServantAttackValueSet(value) {
    document.getElementById("servantAttackBonus").value = value;
}

function ConfigAttackBonusValueSet(value) {
    document.getElementById("attackBonus").value = value;
}

function ConfigPowerBonusValueSet(value) {
    document.getElementById("powerBonus").value = value;
}

function ConfigNpBonusValueSet(value) {
    document.getElementById("NpBonus").value = value;
}

function ConfigSpecialDefenceValueSet(value) {
    document.getElementById("SpecialDefence").value = value;
}

function ConfigNPEffectivenessSet(checked) {
    document.getElementById("NPEffectivenessUp").checked = checked;
}

function ServantNameFilterValueSet(name) {
    document.getElementById("ServantFilter").value = ""
}

function ClassReset() {
    document.getElementById("PlayerClasses").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    })
}

function ClassSelectAll() {
    document.getElementById("PlayerClasses").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    })
}

function ClassSelect(classname) {
    ClassReset();
    document.getElementById("PlayerClasses").querySelectorAll('input[type=checkbox]').forEach((item) => {
        if (item.id == classname) {
            item.checked = true;
            return;
        }
    })
}

function TraitReset() {
    document.getElementById("EnemyTraits").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    })
}

function TraitSelectAll() {
    document.getElementById("EnemyTraits").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    })
}

function TraitSelect(traitname) {
    document.getElementById("EnemyTraits").querySelectorAll('input[type=checkbox]').forEach((item) => {
        if (item.id == traitname) {
            item.checked = true;
            return;
        }
    })
}

function EnemyClassSelect(classname) {
    document.getElementById("EnemyClass").querySelectorAll('input[type=radio]').forEach((item) => {
        if (item.id == classname)
            item.checked = true;
    })
}

function EnemyAttributeSelect(attrname) {
    document.getElementById("EnemyAttribute").querySelectorAll('input[type=radio]').forEach((item) => {
        if (item.id == attrname)
            item.checked = true;
    })
}

function Reset() {
    //console.log("reset");
    application.Sort(application.sortFunctions.sortByDamage, false);
    EnemyClassSelect("Unknown");
    EnemyAttributeSelect("Star");
    LevelFilterReset();
    LevelFilterSelect(90);
    TargetFilterSelectAll();
    ConfigCardValueSet(0);
    ConfigServantAttackValueSet(1000);
    ConfigAttackBonusValueSet(0);
    ConfigPowerBonusValueSet(0);
    ConfigNpBonusValueSet(0);
    ConfigSpecialDefenceValueSet(0);
    ConfigNPEffectivenessSet(false);
    NPLevelReset();
    NPLevelSelect(1);
    OCLevelReset();
    OCLevelSelect(1);

    ClassSelectAll();
    ServantNameFilterValueSet();
    TraitReset();
}