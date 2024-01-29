

class Application {
    dataSource = [];

    sortFunctions = {
        sortByID: MySource.getSortableField(),
        sortByName: MySource.getSortableField(),
        sortByClass: MySource.getSortableField(),
        sortByAttack: MySource.getSortableField(),
        sortByDamage: MySource.getSortableField(),
        sortByAttackRating: MySource.getSortableField(),
    };

    Supports = [
        //ID, NPType,                                                   atk,    card,   atkUp,  pwr,    np,     SpecialDefence, NPEffectivenessUp
        //SupportConfiguration.Get('', '',            0, 0, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportCastoria', 'Arts',             0, 50, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportSkadiRuler', 'Quick',          0, 65, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportSkadi', 'Quick',               0, 50, 30, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportKoyanskayaLight', 'Buster',    0, 50, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportOberon', 'Quick',              0, 0, 0, 0, 30, 0, 100),
        SupportConfiguration.Get('SupportOberon', 'Arts',               0, 0, 0, 0, 30, 0, 100),
        SupportConfiguration.Get('SupportOberon', 'Buster',             0, 50, 0, 0, 30, 0, 100),

        SupportConfiguration.Get('SupportHelena', 'Quick',              0, 20, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportHelena', 'Arts',               0, 20, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportHelena', 'Buster',             0, 20, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportPara', 'Arts',                 0, 20, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportShakes', 'Buster',             0, 40, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportMarlin', 'Arts',               0, 50, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportCnoc', 'Quick',                0, 0, 70, 0, 20, 0, 0),
        SupportConfiguration.Get('SupportCnoc', 'Arts',                 0, 0, 70, 0, 20, 0, 0),
        SupportConfiguration.Get('SupportCnoc', 'Buster',               0, 0, 70, 0, 20, 0, 0),

        SupportConfiguration.Get('SupportXuFu', 'Arts',                 0, 20, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportMarthaSanta', 'Quick',         0, 0, 70, 50, 0, 0, 0),
        SupportConfiguration.Get('SupportMarthaSanta', 'Arts',          0, 0, 70, 50, 0, 0, 0),
        SupportConfiguration.Get('SupportMarthaSanta', 'Buster',        0, 0, 70, 50, 0, 0, 0),

        SupportConfiguration.Get('SupportNeroSaber', 'Quick',           0, 0, 40, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportNeroSaber', 'Arts',            0, 0, 40, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportNeroSaber', 'Buster',          0, 0, 40, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportReines', 'Quick',              0, 0, 40, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportReines', 'Arts',               0, 0, 40, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportReines', 'Buster',             0, 0, 40, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportTamamo', 'Arts',               0, 50, 0, 0, 30, 0, 0),

        SupportConfiguration.Get('SupportGilCaster', 'Arts',            0, 30, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportWaver', 'Quick',               0, 0, 30, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportWaver', 'Arts',                0, 0, 30, 0, 0, 0, 0),
        SupportConfiguration.Get('SupportWaver', 'Buster',              0, 0, 30, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportMerlin', 'Buster',             0, 50, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportCrane', 'Quick',               0, 0, 20, 0, 30, 0, 0),
        SupportConfiguration.Get('SupportCrane', 'Arts',                0, 0, 20, 0, 30, 0, 0),
        SupportConfiguration.Get('SupportCrane', 'Buster',              0, 0, 20, 0, 30, 0, 0),

        SupportConfiguration.Get('SupportShoushetsu', 'Quick',          0, 0, 20, 0, 50, 0, 0),
        SupportConfiguration.Get('SupportShoushetsu', 'Arts',           0, 30, 20, 0, 50, 0, 0),
        SupportConfiguration.Get('SupportShoushetsu', 'Buster',         0, 0, 20, 0, 50, 0, 0),

        SupportConfiguration.Get('CEBlackGrail', 'Quick',               2400, 0, 0, 0, 80, 0, 0),
        SupportConfiguration.Get('CEBlackGrail', 'Arts',                2400, 0, 0, 0, 80, 0, 0),
        SupportConfiguration.Get('CEBlackGrail', 'Buster',              2400, 0, 0, 0, 80, 0, 0)
    ];

    updateDataSource() {
        this.dataSource = [];

        let servantFilter = MySource.documentGetTextValue("ServantFilter");
        let classes = MySource.documentGetSelectionArray("PlayerClasses");
        let cardTypes = MySource.documentGetSelectionArrayByClass("CardTypeFilterContainer");
        let NPLevels = MySource.documentGetSelectionArrayInt("NPLevels");
        let OCLevels = MySource.documentGetSelectionArrayInt("OCLevels");
        let Traits = MySource.documentGetSelectionArray("EnemyTraits");
        let targetTypes = MySource.documentGetSelectionArray("TargetFilter");
        let levelFilter = MySource.documentGetSelectionArray("LevelFilter");

        let checker = (arr, target) => arr.every(v => target.includes(v));

        let enemy = data.Enemy;
        enemy.Class = MySource.documentGetRadio("EnemyClass");
        enemy.Attribute = MySource.documentGetRadio("EnemyAttribute");

        let defaultSupportConfiguration = new SupportConfiguration();
        defaultSupportConfiguration.servantAttackBonus = parseInt(document.getElementById("servantAttackBonus").value ?? 0);
        defaultSupportConfiguration.cardBonus = document.getElementById("cardBonus").value / 100.0 ?? 0.0;
        defaultSupportConfiguration.attackBonus = document.getElementById("attackBonus").value / 100.0 ?? 0.0;
        defaultSupportConfiguration.powerBonus = document.getElementById("powerBonus").value / 100.0 ?? 0.0;
        defaultSupportConfiguration.NpBonus = document.getElementById("NpBonus").value / 100.0 ?? 0.0;
        defaultSupportConfiguration.SpecialDefence = document.getElementById("SpecialDefence").value / 100.0 ?? 0.0;
        defaultSupportConfiguration.NPEffectivenessUp = MySource.documentGetCheckedFloatValue("NPEffectivenessUp") / 100.0 ?? 0.0;

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

        data.Servants.forEach((servant) => {
            //if (servant.ID == "ID356") console.log(servant);
            servant.DamageCalculations.forEach((calc) => {
                if (servantFilter.length > 0) {
                    let servantMatch = servant.Name.toLowerCase().includes(servantFilter.toLowerCase());
                    if (!servantMatch) {
                        servantMatchCount++;
                        return;
                    }
                }

                let targetTypeMatch = targetTypes.includes(calc.NoblePhantasm.TargetType);
                if (!targetTypeMatch) {
                    targetTypeMatchCount++;
                    return;
                }

                let classMatch = classes.includes(calc.ClassType);
                if (!classMatch) {
                    classMatchCount++;
                    return;
                }

                let cardTypeMatch = cardTypes.includes(calc.NoblePhantasm.CardType);
                if (!cardTypeMatch) {
                    cardTypeMatchCount++;
                    return;
                }

                let OCmatch = OCLevels.includes(calc.OCLevel);
                if (!OCmatch) {
                    OCmatchCount++;
                    return;
                }

                let traitMatch = calc.Traits.length == 0 || (Traits.length > 0 && checker(calc.Traits, Traits));
                if (!traitMatch) {
                    traitMatchCount++;
                    return;
                }

                let FreeNp5 = servant.IsFree && calc.NPLevel == 5;
                let NPLevelMatch = !servant.IsFree && NPLevels.includes(calc.NPLevel);
                if (!NPLevelMatch && !FreeNp5) {
                    NPLevelMatchCount++;
                    return;
                }

                let LevelMatch = levelFilter.includes(calc.ServantLevel.toString());
                let LevelMatch2 = levelFilter.includes("90") && calc.ServantLevel <= 90;
                if (!LevelMatch && !LevelMatch2) {
                    levelMatchCount++;
                    return;
                }

                let selectedSupports = [defaultSupportConfiguration];
                this.Supports.forEach((item) => {
                    let type = item.NPType;
                    if (type != calc.NoblePhantasm.CardType) return;
                    let count2ID = item.ID + "2";
                    let count1ID = item.ID + "1";
                    if (!document.getElementById(count1ID).hidden) {
                        selectedSupports.push(item);
                    }
                    let el2 = document.getElementById(count2ID);
                    if (el2 != null && !el2.hidden) {
                        selectedSupports.push(item);
                    }
                });

                let damageCalculation = damage.CalculateDamage(servant, enemy, calc, selectedSupports);
                this.dataSource.push(damageCalculation);
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

        if (this.sortFunctions.sortByID.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.ID, b.inputServant.ID, this.sortFunctions.sortByID.asc));

        else if (this.sortFunctions.sortByName.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.Name, b.inputServant.Name, this.sortFunctions.sortByName.asc));

        else if (this.sortFunctions.sortByClass.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.Class, b.inputServant.Class, this.sortFunctions.sortByClass.asc));

        else if (this.sortFunctions.sortByAttack.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.ServantAttack, b.ServantAttack, this.sortFunctions.sortByAttack.asc));

        else if (this.sortFunctions.sortByAttackRating.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.MiscAttackRating, b.MiscAttackRating, this.sortFunctions.sortByAttackRating.asc));

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

            item.inputCalc.Effects.forEach(function (item) {
                let description = item.Description;
                if (description !== "") {
                    let p = document.createElement("span");
                    p.textContent = description;
                    effectRow.append(p);
                }
            });

            item.inputCalc.SuperModTraits.forEach(function (item) {
                let p = document.createElement("div");
                p.textContent = "Super Effective against " + item;
                effectRow.append(p);
            });

            let traitRow = document.createElement("div");
            item.inputCalc.Traits.forEach(function (item) {
                let description = item;
                if (description !== "") {
                    let p = document.createElement("div");
                    p.textContent = description;
                    traitRow.append(p);
                }
            });

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
            row.insertCell().append(document.createTextNode(item.inputServant.Name));
            row.insertCell().append(document.createTextNode(item.inputServant.Rarity));
            row.insertCell().append(document.createTextNode(item.inputCalc.NoblePhantasm.CardType));
            row.insertCell().append(document.createTextNode(item.inputCalc.NoblePhantasm.TargetType));
            row.insertCell().append(document.createTextNode(item.inputServant.Class));
            row.insertCell().append(document.createTextNode(item.inputServant.Attribute));
            row.insertCell().append(document.createTextNode(item.inputCalc.ServantLevel));
            row.insertCell().append(document.createTextNode(item.inputCalc.NPLevel));
            row.insertCell().append(document.createTextNode(item.inputCalc.OCLevel));
            row.insertCell().append(document.createTextNode(item.ServantAttack));
            row.insertCell().append(document.createTextNode(item.CalculatedDamage));

            row.insertCell().append(document.createTextNode(item.MiscAttackRating));
            row.insertCell().append(document.createTextNode(this.round(item.TotalCardMod)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalAttackMod)));
            row.insertCell().append(document.createTextNode(this.round(item.TotalPowerNpMod)));

            if (ShowTraits)
                row.insertCell().append(traitRow);

            if (ShowDetails)
                row.insertCell().append(effectRow);
        });
    };

    round(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    sortReset() {
        this.sortFunctions.sortByID.enabled = false;
        this.sortFunctions.sortByName.enabled = false;
        this.sortFunctions.sortByAttack.enabled = false;
        this.sortFunctions.sortByDamage.enabled = false;
        this.sortFunctions.sortByAttackRating.enabled = false;
    }

    updateTraits() {
        let checkUncheck = function (id1, id2) {
            if (MySource.IsChecked(id1) && !MySource.IsChecked(id2)) MySource.Check(id2);
            if (!MySource.IsChecked(id1) && MySource.IsChecked(id2)) MySource.Uncheck(id2);
        };

        checkUncheck('Saber', 'SaberClassServant');

        checkUncheck('Sky', 'AttributeSky');
        //checkUncheck('Sky', 'SkyOrEarth');

        checkUncheck('Earth', 'AttributeEarth');
        //checkUncheck('Earth', 'SkyOrEarth');

        checkUncheck('Man', 'AttributeMan');
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
}