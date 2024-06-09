

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
        //ID,                                                   atk,    card,   atkUp,  pwr,    np,     SpecialDefence, NPEffectivenessUp
        //SupportConfiguration.Get('', '',            0, 0, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('ArtsSupportCastoria',   0, 50, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportCastoria',   0, 0, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportCastoria',   0, 0, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportSkadiRuler', 0, 0, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportSkadiRuler', 0, 65, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportSkadiRuler', 0, 0, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportSkadi',      0, 0, 30, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportSkadi',      0, 50, 30, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportSkadi',      0, 0, 30, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportKoyanskayaLight', 0, 0, 0, 50, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportKoyanskayaLight', 0, 0, 0, 50, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportKoyanskayaLight', 0, 50, 0, 50, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportOberon', 0, 0, 0, 0, 30, 0, 100),
        SupportConfiguration.Get('QuickSupportOberon', 0, 0, 0, 0, 30, 0, 100),
        SupportConfiguration.Get('BusterSupportOberon', 0, 50, 0, 0, 30, 0, 100),

        SupportConfiguration.Get('SupportHelena', 0, 20, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportPara', 0, 20, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportPara', 0, 0, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportPara', 0, 0, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportShakes', 0, 0, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportShakes', 0, 0, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportShakes', 0, 40, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportMarlin', 0, 50, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportMarlin', 0, 0, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportMarlin', 0, 0, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportCnoc', 0, 0, 70, 0, 20, 0, 0),

        SupportConfiguration.Get('ArtsSupportXuFu', 0, 20, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportXuFu', 0, 0, 0, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportXuFu', 0, 0, 0, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportMarthaSanta', 0, 0, 70, 50, 0, 0, 0),

        SupportConfiguration.Get('SupportNeroSaber', 0, 0, 40, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportReines', 0, 0, 40, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportTamamo', 0, 50, 0, 0, 30, 0, 0),
        SupportConfiguration.Get('QuickSupportTamamo', 0, 0, 0, 0, 30, 0, 0),
        SupportConfiguration.Get('BusterSupportTamamo', 0, 0, 0, 0, 30, 0, 0),

        SupportConfiguration.Get('ArtsSupportGilCaster', 0, 30, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportGilCaster', 0, 0, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportGilCaster', 0, 0, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportWaver', 0, 0, 30, 0, 0, 0, 0),

        SupportConfiguration.Get('ArtsSupportMerlin', 0, 0, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('QuickSupportMerlin', 0, 0, 20, 0, 0, 0, 0),
        SupportConfiguration.Get('BusterSupportMerlin', 0, 50, 20, 0, 0, 0, 0),

        SupportConfiguration.Get('SupportCrane', 0, 0, 20, 0, 30, 0, 0),

        SupportConfiguration.Get('ArtsSupportShoushetsu', 0, 30, 20, 0, 50, 0, 0),
        SupportConfiguration.Get('QuickSupportShoushetsu', 0, 0, 20, 0, 50, 0, 0),
        SupportConfiguration.Get('BusterSupportShoushetsu', 0, 0, 20, 0, 50, 0, 0),

        SupportConfiguration.Get('CEBlackGrail', 2400, 0, 0, 0, 80, 0, 0)
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
                    let count1ID = item.ID + "1";
                    let count2ID = item.ID + "2";
                    if (!item.ID.includes(calc.NoblePhantasm.CardType + "Support")) {
                        count1ID = calc.NoblePhantasm.CardType + item.ID + "1";
                        count2ID = calc.NoblePhantasm.CardType + item.ID + "2";
                    }

                    let element1 = document.getElementById(count1ID);
                    let element2 = document.getElementById(count2ID);

                    if (element1 != null && !element1.hidden) {
                        selectedSupports.push(item);
                        if (element2 != null && !element2.hidden) {
                            selectedSupports.push(item);
                        }
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
        document.getElementById("Column_ID").hidden = !ShowDetails;
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

            if (ShowDetails)
                row.insertCell().append(idNode);

            let servantNameCell = document.createElement('a');
            servantNameCell.setAttribute('href', 'https://apps.atlasacademy.io/db/JP/servant/' + item.inputServant.ID.replace('ID', ''));
            servantNameCell.setAttribute('target', '_blank');
            servantNameCell.appendChild(document.createTextNode(item.inputServant.Name));
            servantNameCell.classList.add("UUID");
            servantNameCell.id = item.uuid;
            servantNameCell.classList.add("servantCardType" + item.inputCalc.NoblePhantasm.CardType);
            row.insertCell().append(servantNameCell);

            let rarityIcon = document.createElement("img");
            rarityIcon.setAttribute("src", "media/rarity/" + item.inputServant.Rarity + ".png");
            row.insertCell().append(rarityIcon);

            //row.insertCell().append(document.createTextNode(item.inputCalc.NoblePhantasm.CardType));           
            row.insertCell().append(document.createTextNode(item.inputCalc.NoblePhantasm.TargetType));

            let classIcon = document.createElement("img");
            classIcon.setAttribute("src", "media/class/" + item.inputServant.Class + ".png");
            classIcon.classList.add("class-icon-table");
            row.insertCell().append(classIcon);

            row.insertCell().append(document.createTextNode(item.inputServant.Attribute));
            row.insertCell().append(document.createTextNode(item.inputCalc.ServantLevel));
            row.insertCell().append(document.createTextNode(item.inputCalc.NPLevel));
            row.insertCell().append(document.createTextNode(item.inputCalc.OCLevel));
            row.insertCell().append(document.createTextNode(item.inputCalc.StackLevel));
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