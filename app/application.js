

class Application {
    dataSource = [];
    enemy = null;

    sortFunctions = {
        sortByID: MySource.getSortableField(),
        sortByName: MySource.getSortableField(),
        sortByClass: MySource.getSortableField(),
        sortByAttack: MySource.getSortableField(),
        sortByDamage: MySource.getSortableField(),
        sortByAttackRating: MySource.getSortableField(),
        sortByRefund: MySource.getSortableField()
    };

    updateDataSource() {
        this.dataSource = [];

        let servantFilter = MySource.documentGetTextValue("ServantFilter");
        let classes = MySource.documentGetSelectionArray("PlayerClasses");
        let cardTypes = MySource.documentGetSelectionArrayByClass("CardTypeFilterContainer");
        let NPLevels = MySource.documentGetSelectionArray("NPLevels");
        let OCLevels = MySource.documentGetSelectionArray("OCLevels");
        let targetTypes = MySource.documentGetSelectionArray("TargetFilter");
        let levelFilter = MySource.documentGetSelectionArray("LevelFilter");
        let stackLevels = MySource.documentGetSelectionArrayByClass("StackLevels");
        //console.log(servantFilter, classes, cardTypes, NPLevels, OCLevels, targetTypes, levelFilter);

        //let checker = (arr, target) => arr.every(v => target.includes(v));

        this.enemy = new Enemy();
        this.enemy.Class = MySource.documentGetRadio("EnemyClass");
        this.enemy.Attribute = MySource.documentGetRadio("EnemyAttribute");
        this.enemy.Traits = MySource.documentGetSelectionArray("EnemyTraits");

        let count = 0;
        //MISMATCH
        let servantMatchCount = 0;
        let targetTypeMatchCount = 0
        let classMatchCount = 0;
        let cardTypeMatchCount = 0;
        let OCmatchCount = 0;
        let traitMatchCount = 0;
        let NPLevelMatchCount = 0;
        let levelMatchCount = 0;
        let StackMatchCount = 0;

        data.forEach((servant) => {
            //if (servant.ID == "ID356") console.log(servant);
            servant.NoblePhantasms.forEach((noblePhantasm) => {
                //console.log(noblePhantasm);

                if (servantFilter.length > 0) {
                    let servantMatch = servant.Name.toLowerCase().includes(servantFilter.toLowerCase());
                    if (!servantMatch) {
                        servantMatchCount++;
                        return;
                    }
                }

                let targetTypeMatch = targetTypes.includes(this.GetTargetString(noblePhantasm.AOE));
                if (!targetTypeMatch) {
                    targetTypeMatchCount++;
                    return;
                }

                let classMatch = classes.includes(servant.Class.toLowerCase());
                if (!classMatch) {
                    classMatchCount++;
                    return;
                }


                let cardTypeMatch = cardTypes.includes(noblePhantasm.CardType);
                if (!cardTypeMatch) {
                    cardTypeMatchCount++;
                    return;
                }

                let OCmatch = OCLevels.includes(noblePhantasm.Overcharge);
                if (!OCmatch) {
                    OCmatchCount++;
                    return;
                }

                let stackMatch = stackLevels.includes(noblePhantasm.Stack+"")
                if (!stackMatch) {
                    StackMatchCount++;
                    return;
                }

                let FreeNp5 = ((servant.Rarity == "1" || servant.Rarity == "2" || servant.Rarity == "3") || servant.Free);
                if (FreeNp5) {
                    if (noblePhantasm.Level != 5) {
                        NPLevelMatchCount++;
                        return;
                    }
                } else {
                    let NPLevelMatch = NPLevels.includes(noblePhantasm.Level);
                    if (!NPLevelMatch) {
                        NPLevelMatchCount++;
                        return;
                    }
                }                

                let LevelMatch = levelFilter.includes(noblePhantasm.ServantLevel.toString());
                let LevelMatch2 = levelFilter.includes("90") && noblePhantasm.ServantLevel <= 90;
                if (!LevelMatch && !LevelMatch2) {
                    levelMatchCount++;
                    return;
                }

                let damageCalculation = new DamageCalculation();
                damageCalculation.configServantAttack = parseInt(document.getElementById("servantAttackBonus").value ?? 0);
                damageCalculation.configCardBonus = document.getElementById("cardBonus").value / 100.0 ?? 0.0;
                damageCalculation.configAtttackBonus = document.getElementById("attackBonus").value / 100.0 ?? 0.0;
                damageCalculation.configPowerBonus = document.getElementById("powerBonus").value / 100.0 ?? 0.0;
                damageCalculation.configNpBonus = document.getElementById("NpBonus").value / 100.0 ?? 0.0;
                damageCalculation.configSpecialDefence = document.getElementById("SpecialDefence").value / 100.0 ?? 0.0;
                damageCalculation.configNpEffectivenessUp = MySource.documentGetCheckedFloatValue("NPEffectivenessUp") / 100.0 ?? 0.0;
                damageCalculation.configNpRateBonus = document.getElementById("npRateBonus").value / 100.0 ?? 0.0;
                damageCalculation.configUseAppends = document.getElementById("UseAppends").checked;
                damageCalculation.Calculate(servant, this.enemy, noblePhantasm);
                this.dataSource.push(damageCalculation);
                //console.log(damageCalculation);
                count++;
            });
        });

        console.log("after filtering: " + count);
        console.log("MISMATCH: servantMatchCount: " + servantMatchCount);
        console.log("MISMATCH: targetTypeMatchCount: " + targetTypeMatchCount);
        console.log("MISMATCH: classMatchCount: " + classMatchCount);
        console.log("MISMATCH: cardTypeMatchCount: " + cardTypeMatchCount);
        console.log("MISMATCH: OCmatchCount: " + OCmatchCount);
        console.log("MISMATCH: traitMatchCount: " + traitMatchCount);
        console.log("MISMATCH: NPLevelMatchCount: " + NPLevelMatchCount);
        console.log("MISMATCH: levelMatchCount: " + levelMatchCount);
        console.log("MISMATCH: StackMatchCount: " + StackMatchCount);

        if (this.sortFunctions.sortByID.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.inputServant.ID, b.inputServant.ID, this.sortFunctions.sortByID.asc));

        else if (this.sortFunctions.sortByName.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.Name, b.inputServant.Name, this.sortFunctions.sortByName.asc));

        else if (this.sortFunctions.sortByClass.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.Class, b.inputServant.Class, this.sortFunctions.sortByClass.asc));

        else if (this.sortFunctions.sortByAttack.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.ServantAttack, b.ServantAttack, this.sortFunctions.sortByAttack.asc));

        else if (this.sortFunctions.sortByAttackRating.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.MiscAttackRating, b.MiscAttackRating, this.sortFunctions.sortByAttackRating.asc));

        else if (this.sortFunctions.sortByRefund.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.TotalBaseRefund, b.TotalBaseRefund, this.sortFunctions.sortByRefund.asc));

        else //sort by damage by default
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.CalculatedDamage, b.CalculatedDamage, this.sortFunctions.sortByDamage.asc));
    }

    updateTable() {
        let table = document.getElementById("NPTable");
        table.querySelectorAll("tbody").forEach((body) => {
            body.remove()
        });
        let tbody = table.createTBody();

        let ShowDetails = document.getElementById("ShowDetails").checked;
        let ShowTraits = MySource.documentGetSelectionArray("EnemyTraits").length > 0;
        document.getElementById("Column_Effects").hidden = !ShowDetails;
        document.getElementById("Column_Traits").hidden = !ShowTraits;

        let rank = 1;

        //console.log(this.dataSource.length);

        this.dataSource.forEach((item) => {
            let effectRow = document.createElement("div");
            effectRow.classList.add("Column_Effects");

            let idNode = document.createElement('a');
            idNode.setAttribute('href', 'https://apps.atlasacademy.io/db/JP/servant/' + item.inputServant.ID.replace('ID', ''));
            idNode.setAttribute('target', '_blank');
            idNode.appendChild(document.createTextNode(item.inputServant.ID.replace('ID', '')));
            idNode.classList.add("UUID");
            idNode.id = item.uuid;

            idNode.addEventListener('click', function () {
                console.log(application.dataSource.find((element) => element.uuid == idNode.id));
            });

            let row = tbody.insertRow(tbody.rows.length);
            row.insertCell().append(document.createTextNode(rank)); rank = rank + 1;
            row.insertCell().append(idNode);

            let servantNameNode = document.createElement("div");
            servantNameNode.classList.add("font-" + item.inputNoblePhantasm.CardType);
            servantNameNode.append(document.createTextNode(item.inputServant.Name));
            row.insertCell().append(servantNameNode);  

            row.insertCell().append(document.createTextNode(item.inputServant.Class));
            row.insertCell().append(document.createTextNode(item.inputNoblePhantasm.ServantLevel));
            row.insertCell().append(document.createTextNode(item.inputNoblePhantasm.Level));
            row.insertCell().append(document.createTextNode(item.inputNoblePhantasm.Overcharge));
            row.insertCell().append(document.createTextNode(item.inputNoblePhantasm.Stack));

            row.insertCell().append(document.createTextNode(item.MiscAttackRating));
            row.insertCell().append(document.createTextNode(item.CalculatedDamage));

            row.insertCell().append(document.createTextNode(this.round(item.inputNoblePhantasm.NPMod * 100)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalCardMod)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalAttackMod)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalPowerNpMod)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalNpRateUp)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalBaseRefund)));

            if (ShowTraits) {
                let traitRow = document.createElement("div");
                item.appliedTraits.forEach(function (item) {
                    let p = document.createElement("div");
                    p.textContent = item;
                    traitRow.append(p);
                });
                row.insertCell().append(traitRow);
            };

            if (ShowDetails) {
                let traitRow = document.createElement("div");
                item.effectText.forEach(function (item) {
                    let p = document.createElement("div");
                    p.textContent = item;
                    traitRow.append(p);
                });
                row.insertCell().append(traitRow);
            };
        });
    };

    round(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    Sort(sortFunction, asc) {
        this.sortFunctions.sortByAttack.enabled = false
        this.sortFunctions.sortByAttackRating.enabled = false;
        this.sortFunctions.sortByClass.enabled = false;
        this.sortFunctions.sortByDamage.enabled = false;
        this.sortFunctions.sortByID.enabled = false;
        this.sortFunctions.sortByName.enabled = false;
        this.sortFunctions.sortByRefund.enabled = false;
        sortFunction.enabled = true;
        if (asc == undefined)
            sortFunction.asc = !sortFunction.asc;
        else
            sortFunction.asc = asc;
    }

    updateTraits() {
        MySource.Uncheck("classAlterEgo");
        MySource.Uncheck("classArcher");
        MySource.Uncheck("classAssassin");
        MySource.Uncheck("classAvenger");
        MySource.Uncheck("classBeast");
        MySource.Uncheck("classBeastEresh");
        MySource.Uncheck("classBerserker");
        MySource.Uncheck("classCaster");
        MySource.Uncheck("classForeigner");
        MySource.Uncheck("classLancer");
        MySource.Uncheck("classMoonCancer");
        MySource.Uncheck("classPretender");
        MySource.Uncheck("classRider");
        MySource.Uncheck("classRuler");
        MySource.Uncheck("classSaber");
        MySource.Uncheck("classShielder");
        try {
            let value = 'class' + MySource.documentGetRadio("EnemyClass").substr(0, 1).toUpperCase() + MySource.documentGetRadio("EnemyClass").substr(1);
                MySource.Check(value);
        } catch (error) {
            console.log(error);
        }
        MySource.Uncheck("attributeEarth");
        MySource.Uncheck("attributeHuman");
        MySource.Uncheck("attributeSky");
        try {
            let value = 'attribute' + MySource.documentGetRadio("EnemyAttribute").substr(0, 1).toUpperCase() + MySource.documentGetRadio("EnemyAttribute").substr(1);
            MySource.Check(value);
        } catch (error) {
            console.log(error);
        }
    }

    OnFilterChange() {
        //console.log("filter changed");
        //console.trace();
        this.updateDataSource();
        this.updateTable();
    }

    OnSupportClick(elementId) {
        let element1 = document.getElementById(elementId + '1');
        let element2 = document.getElementById(elementId + '2');
        let element2exists = element2 != null;

        if (!element2exists) {
            if (element1.hidden) {
                element1.hidden = false;
                this.OnFilterChange();
                return;
            }
            element1.hidden = true;
            this.OnFilterChange();
            return;
        }

        if (element1.hidden && element2.hidden) {
            element1.hidden = false;
            this.OnFilterChange();
            return;
        }
        if (!element1.hidden && element2.hidden) {
            element2.hidden = false;
            this.OnFilterChange();
            return;
        }
        element1.hidden = true;
        element2.hidden = true;
        this.OnFilterChange();
    }

    GetTargetString(isAoe) {
        let returnValue = isAoe ? "EnemyTeam" : "Enemy";
        return returnValue.toLowerCase();
    }

    GetTraits() {
        let traits = [];
        data.forEach((servant) => {
            servant.Skills.forEach((skillItem) => {
                skillItem.Effects.forEach((effectItem) => {
                    effectItem.Traits.forEach((trait) => {
                        if (!traits.includes(trait))
                            traits.push(trait);
                    });
                });
            });
            servant.NoblePhantasms.forEach((npItem) => {
                npItem.Traits.forEach((trait) => {
                    if (!traits.includes(trait))
                        traits.push(trait);
                });
            });
        });
        return traits;
    }
}

class Enemy {
    Class = "saber";
    Attribute = "star";
    Traits = [];
}

class DamageCalculation {
    constructor() { }

    uuid = crypto.randomUUID();

    inputEnemy = null;
    inputServant = null;
    inputNoblePhantasm = null;

    TriangleMod = null;
    AttributeMod = null;

    ServantAttack = null;
    NPValue = null;
    ScalingHpMod = 1;
    ClassMod = 0;
    CardTypeMode = 1;
    CardMod = 0;
    CardResistanceMod = 0;
    RandomMod = 0.9;
    Const = 0.23;
    AttackMod = 0;
    DefenceMod = 0;
    SpecialDefMod = 0;
    PowerMod = 0;
    NpPowerMod = 0;
    SuperModValue = 1;
    NPEffectivenessMod = 1;
    NPGainUp = 0;
    NPRegain = 0;

    configServantAttack = 0;
    configCardBonus = 0;
    configAtttackBonus = 0;
    configPowerBonus = 0;
    configNpBonus = 0;
    configSpecialDefence = 0;
    configNpEffectivenessUp = 0;
    configNpRateBonus = 0;
    configUseAppends = false;

    TotalCardMod = null;
    TotalAttackMod = null;
    TotalNpMod = null;
    TotalPowerNpMod = null;
    TotalNpRateUp = null;
    TotalBaseRefund = null;

    MiscAttackRating = 0;
    CalculatedDamage = 0.0;

    effectText = [];
    appliedTraits = [];

    Calculate(servant, enemy, noblePhantasm) {
        this.inputServant = servant;
        this.inputEnemy = enemy
        this.inputNoblePhantasm = noblePhantasm;

        this.TriangleMod = parseFloat(DamageTriangle.getTriangleMod(servant, enemy));
        this.AttributeMod = parseFloat(DamageTriangle.getAttributeMod(servant, enemy));

        this.ServantAttack = parseInt(noblePhantasm.ServantAttack) + parseInt(this.configServantAttack);
        this.NPValue = parseFloat(noblePhantasm.NPMod);
        //this.ScalingHpMod = parseFloat(noblePhantasm.ScalingHpMod);
        this.ClassMod = parseFloat(servant.ClassMod);
        this.CardTypeMode = parseFloat(noblePhantasm.CardTypeMode);

        let parseEffect = ((skill, effect, isSkill) => {
            if (
                (effect.Type == "upCommandall" || effect.Type == "downDefencecommandall")
                && this.matchValue(noblePhantasm.CardType, effect.Cards)) {
                if (this.matchTrait(effect.Traits, enemy.Traits, true)) {
                    this.CardMod += effect.Value;
                    this.effectText.push(this.getEffectString(skill, effect));
                }
            }
            if (effect.Type == "upAtk") {
                if (this.matchTrait(effect.Traits, enemy.Traits, true)) {
                    this.AttackMod += effect.Value;
                    this.effectText.push(this.getEffectString(skill, effect));
                }
            }
            if (effect.Type == "downDefence") {
                let targetMatch = (noblePhantasm.AOE && effect.AOE || !noblePhantasm.AOE);
                if (targetMatch && this.matchTrait(effect.Traits, enemy.Traits, true)) {
                    this.AttackMod += effect.Value;
                    this.effectText.push(this.getEffectString(skill, effect));
                }
            }
            if (effect.Type == "upDamage" || effect.Type == "upDamageIndividuality") {
                //console.log(effect.Traits, enemy.Traits);
                if (this.matchTrait(effect.Traits, enemy.Traits, false)) {
                    this.PowerMod += effect.Value;
                    this.effectText.push(this.getEffectString(skill, effect));
                }
            }
            if (effect.Type == "upNpdamage") {
                if (this.matchTrait(effect.Traits, enemy.Traits, true)) {
                    this.NpPowerMod += effect.Value;
                    this.effectText.push(this.getEffectString(skill, effect));
                }
            }
            if (effect.Type == "upDropnp") {
                //if (this.matchTrait(effect.Traits, enemy.Traits, true)) {
                this.NPGainUp += effect.Value;
                this.effectText.push(this.getEffectString(skill, effect));
                //}
            }
            if (effect.Type == "regainNp") {
                this.NPRegain += effect.Value * 10;
                this.effectText.push(this.getEffectString(skill, effect));
            }            
            if(effect.Type == "gainNp" && !isSkill) {
                this.NPRegain += effect.Value * 10;
                this.effectText.push(this.getEffectString(skill, effect));
            }
        });
        
        servant.Skills.forEach((skill) => {
            skill.Effects.forEach((effect) => {
                parseEffect(skill, effect, true);
            });
        });

        if (this.configUseAppends) {
            servant.AppendSkills.forEach((skill) => {
                skill.Effects.forEach((effect) => {
                    parseEffect(skill, effect, true);
                });
            });
        }

        noblePhantasm.NoblePhantasmBuff.Effects.forEach((effect) => {
            if (effect.BeforeDamage || effect.Type == "regainNp" || effect.Type == "gainNp")
                parseEffect(noblePhantasm.NoblePhantasmBuff, effect, false);
        });

        //this.CardResistanceMod = parseFloat(noblePhantasm.CardResistanceMod);
        //this.DefenceMod = parseFloat(noblePhantasm.DefenceMod);
        this.SpecialDefMod = parseFloat(this.configSpecialDefence);
        if (this.matchTrait(noblePhantasm.Traits, enemy.Traits, false)) {
            //console.log(noblePhantasm.Traits, enemy.Traits);
            this.SuperModValue = parseFloat(noblePhantasm.SuperMod) * parseFloat(noblePhantasm.StackMod);
        }
        if (servant.ID == "417") {
            this.SuperModValue = parseFloat(noblePhantasm.SuperMod) * parseFloat(noblePhantasm.StackMod);
        }
        this.NPEffectivenessMod = Math.min(2, 1 + parseFloat(this.configNpEffectivenessUp));

        this.TotalCardMod = (1 + this.CardMod - this.CardResistanceMod + parseFloat(this.configCardBonus));
        this.TotalAttackMod = (1 + this.AttackMod - this.DefenceMod + parseFloat(this.configAtttackBonus));
        this.TotalNpMod = (this.NpPowerMod +  parseFloat(this.configNpBonus)) * this.NPEffectivenessMod;
        this.TotalPowerNpMod = (1 + this.PowerMod + this.TotalNpMod + parseFloat(this.configPowerBonus));
        this.TotalNpRateUp = 1 + this.NPGainUp + parseFloat(this.configNpRateBonus);
        this.TotalBaseRefund = this.TotalNpRateUp * this.inputNoblePhantasm.NpGainCardMod * this.inputNoblePhantasm.NPGain * this.inputNoblePhantasm.Hits;
        if (this.inputNoblePhantasm.AOE)
            this.TotalBaseRefund *= 3;
        this.TotalBaseRefund *= this.TotalCardMod;
        this.TotalBaseRefund += this.NPRegain;        

        let debug = false;
        if (debug)
            console.log(this.ServantAttack
                , this.NPValue
                , this.ScalingHpMod
                , this.ClassMod
                , this.CardTypeMode
                , this.TotalCardMod
                , this.TriangleMod
                , this.AttributeMod
                , this.RandomMod
                , this.Const
                , this.TotalAttackMod
                , this.SpecialDefMod
                , this.TotalPowerNpMod
                , this.SuperModValue
            );

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
            * (1 - this.SpecialDefMod)
            * this.TotalPowerNpMod
            * this.SuperModValue
            ;
        this.CalculatedDamage = Math.round(this.CalculatedDamage);
        this.MiscAttackRating = Math.round(this.ServantAttack * this.ClassMod);

        if (servant.ID == "368")
            console.log(this);

        return this;
    }

    matchValue(value, array) {
        return array.includes(value.toLowerCase());
    }

    matchTrait(traitArray, enemyArray, onArrayEmpty) {
        if (traitArray.length == 0)
            return onArrayEmpty;
        enemyArray = enemyArray.map(v => v.toLowerCase());
        for (let i = 0; i < traitArray.length; i++) {
            let selectedTrait = traitArray[i].toLowerCase();
            if (enemyArray.includes(selectedTrait)) {
                if (!this.appliedTraits.includes(selectedTrait))
                    this.appliedTraits.push(selectedTrait);
                return true;    
            }
        };
        return false;
    }

    getEffectString(skill, effect) {
        return "[" + skill.Name + "] " + effect.Name + " " + effect.Value * 100.0;
    }
}

class DamageTriangle {
    static ClassTriangle = [
        {
            "Attacker": "Berserker",
            "Defender": "Unknown",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Unknown",
            "Value": 1.5
        },
        {
            "Attacker": "Saber",
            "Defender": "Archer",
            "Value": 0.5
        },
        {
            "Attacker": "Saber",
            "Defender": "Lancer",
            "Value": 2.0
        },
        {
            "Attacker": "Saber",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Saber",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Saber",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Archer",
            "Defender": "Saber",
            "Value": 2.0
        },
        {
            "Attacker": "Archer",
            "Defender": "Lancer",
            "Value": 0.5
        },
        {
            "Attacker": "Archer",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Archer",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Archer",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Lancer",
            "Defender": "Saber",
            "Value": 0.5
        },
        {
            "Attacker": "Lancer",
            "Defender": "Archer",
            "Value": 2.0
        },
        {
            "Attacker": "Lancer",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Lancer",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Lancer",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Rider",
            "Defender": "Assassin",
            "Value": 0.5
        },
        {
            "Attacker": "Rider",
            "Defender": "Caster",
            "Value": 2.0
        },
        {
            "Attacker": "Rider",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Rider",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Rider",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Caster",
            "Defender": "Rider",
            "Value": 0.5
        },
        {
            "Attacker": "Caster",
            "Defender": "Assassin",
            "Value": 2.0
        },
        {
            "Attacker": "Caster",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Caster",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Caster",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Assassin",
            "Defender": "Rider",
            "Value": 2.0
        },
        {
            "Attacker": "Assassin",
            "Defender": "Caster",
            "Value": 0.5
        },
        {
            "Attacker": "Assassin",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Assassin",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Assassin",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Saber",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Archer",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Lancer",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Rider",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Caster",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Assassin",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Berserker",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Ruler",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Avenger",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Alterego",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Mooncancer",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Pretender",
            "Value": 1.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Foreigner",
            "Value": 0.5
        },
        {
            "Attacker": "Berserker",
            "Defender": "Beast",
            "Value": 0.5
        },
        {
            "Attacker": "Ruler",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Ruler",
            "Defender": "Avenger",
            "Value": 0.5
        },
        {
            "Attacker": "Ruler",
            "Defender": "Mooncancer",
            "Value": 2.0
        },
        {
            "Attacker": "Ruler",
            "Defender": "Beast",
            "Value": 2.0
        },
        {
            "Attacker": "Alterego",
            "Defender": "Saber",
            "Value": 0.5
        },
        {
            "Attacker": "Alterego",
            "Defender": "Archer",
            "Value": 0.5
        },
        {
            "Attacker": "Alterego",
            "Defender": "Lancer",
            "Value": 0.5
        },
        {
            "Attacker": "Alterego",
            "Defender": "Rider",
            "Value": 1.5
        },
        {
            "Attacker": "Alterego",
            "Defender": "Caster",
            "Value": 1.5
        },
        {
            "Attacker": "Alterego",
            "Defender": "Assassin",
            "Value": 1.5
        },
        {
            "Attacker": "Alterego",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Alterego",
            "Defender": "Foreigner",
            "Value": 2.0
        },
        {
            "Attacker": "Alterego",
            "Defender": "Beast",
            "Value": 2.0
        },
        {
            "Attacker": "Avenger",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Avenger",
            "Defender": "Ruler",
            "Value": 2.0
        },
        {
            "Attacker": "Avenger",
            "Defender": "Mooncancer",
            "Value": 0.5
        },
        {
            "Attacker": "Avenger",
            "Defender": "Beast",
            "Value": 2.0
        },
        {
            "Attacker": "Mooncancer",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Mooncancer",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Mooncancer",
            "Defender": "Avenger",
            "Value": 2.0
        },
        {
            "Attacker": "Mooncancer",
            "Defender": "Beast",
            "Value": 2.0
        },
        {
            "Attacker": "Foreigner",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Foreigner",
            "Defender": "Alterego",
            "Value": 0.5
        },
        {
            "Attacker": "Foreigner",
            "Defender": "Foreigner",
            "Value": 2.0
        },
        {
            "Attacker": "Foreigner",
            "Defender": "Pretender",
            "Value": 2.0
        },
        {
            "Attacker": "Foreigner",
            "Defender": "Beast",
            "Value": 2.0
        },
        {
            "Attacker": "Pretender",
            "Defender": "Saber",
            "Value": 1.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Archer",
            "Value": 1.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Lancer",
            "Value": 1.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Rider",
            "Value": 0.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Caster",
            "Value": 0.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Assassin",
            "Value": 0.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Pretender",
            "Defender": "Alterego",
            "Value": 2.0
        },
        {
            "Attacker": "Pretender",
            "Defender": "Foreigner",
            "Value": 0.5
        },
        {
            "Attacker": "Pretender",
            "Defender": "Beast",
            "Value": 2.0
        },
        {
            "Attacker": "Beast",
            "Defender": "Saber",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Archer",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Lancer",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Rider",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Caster",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Assassin",
            "Value": 1.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Berserker",
            "Value": 2.0
        },
        {
            "Attacker": "Beast",
            "Defender": "Ruler",
            "Value": 0.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Alterego",
            "Value": 0.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Avenger",
            "Value": 0.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Mooncancer",
            "Value": 0.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Foreigner",
            "Value": 0.5
        },
        {
            "Attacker": "Beast",
            "Defender": "Pretender",
            "Value": 0.5
        },
        {
            "Attacker": "BeastEresh",
            "Defender": "Ruler",
            "Value": 1.5
        },
        {
            "Attacker": "BeastEresh",
            "Defender": "Alterego",
            "Value": 0.5
        },
        {
            "Attacker": "BeastEresh",
            "Defender": "Avenger",
            "Value": 1.5
        },
        {
            "Attacker": "BeastEresh",
            "Defender": "Mooncancer",
            "Value": 1.5
        },
        {
            "Attacker": "BeastEresh",
            "Defender": "Foreigner",
            "Value": 1.5
        },
        {
            "Attacker": "BeastEresh",
            "Defender": "Pretender",
            "Value": 1.5
        }
    ];

    static AttributeTriangle = [
        {
            "Attacker": "Sky",
            "Defender": "Earth",
            "Value": 1.1
        },
        {
            "Attacker": "Earth",
            "Defender": "Sky",
            "Value": 0.9
        },
        {
            "Attacker": "Earth",
            "Defender": "Man",
            "Value": 1.1
        },
        {
            "Attacker": "Man",
            "Defender": "Earth",
            "Value": 0.9
        },
        {
            "Attacker": "Man",
            "Defender": "Sky",
            "Value": 1.1
        },
        {
            "Attacker": "Sky",
            "Defender": "Man",
            "Value": 0.9
        },
        {
            "Attacker": "Star",
            "Defender": "Beast",
            "Value": 1.1
        }
    ];

    static getTriangleMod(servant, enemy) {
        let item = DamageTriangle.ClassTriangle.find((element) => {
            return (element.Attacker.toLowerCase() == servant.Class && element.Defender.toLowerCase() == enemy.Class);
        });

        if (item === undefined)
            return 1.0;

        return item.Value;
    }

    static getAttributeMod(servant, enemy) {
        let item = DamageTriangle.AttributeTriangle.find((element) => {
            return element.Attacker.toLowerCase() == servant.Attribute && element.Defender.toLowerCase() == enemy.Attribute;
        });

        if (item === undefined)
            return 1.0;

        return item.Value;
    }
}