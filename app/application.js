

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

    SupportConfigurations = [
        //ID, NPType,                           atk,    card,   atkUp,  pwr,    np,     SpecialDefence, NPEffectivenessUp
        SupportConfiguration.Get('BHGSkadi2XOberon', 'Quick', 3400, 130, 40, 0, 110, 0, 100),
        SupportConfiguration.Get('BHGCastoria2XOberon', 'Arts', 3400, 100, 40, 0, 110, 0, 100),
        SupportConfiguration.Get('BHGKoyanskaya2XOberon', 'Buster', 3400, 150, 0, 100, 110, 0, 100),

        SupportConfiguration.Get('BHGSkadi2X', 'Quick', 3400, 130, 40, 0, 80, 0, 0),
        SupportConfiguration.Get('BHGCastoria2X', 'Arts', 3400, 100, 40, 0, 80, 0, 0),
        SupportConfiguration.Get('BHGKoyanskaya2X', 'Buster', 3400, 150, 0, 100, 80, 0, 0),

        SupportConfiguration.Get('BHGSkadiOberon', 'Quick', 3400, 80, 25, 0, 110, 0, 100),
        SupportConfiguration.Get('BHGCastoriaOberon', 'Arts', 3400, 50, 20, 0, 110, 0, 100),
        SupportConfiguration.Get('BHGKoyanskayaOberon', 'Buster', 3400, 100, 0, 50, 110, 0, 100),
    ];

    updateDataSource() {
        this.dataSource = [];

        let servantFilter = MySource.documentGetTextValue("ServantFilter");
        let classes = MySource.documentGetSelectionArray("PlayerClasses");
        let cardTypes = MySource.documentGetSelectionArrayByClass("CardType");
        let NPLevels = MySource.documentGetSelectionArrayInt("NPLevels");
        let OCLevels = MySource.documentGetSelectionArrayInt("OCLevels");
        let Traits = MySource.documentGetSelectionArray("EnemyTraits");
        let targetTypes = MySource.documentGetSelectionArray("TargetFilter");
        let levelFilter = MySource.documentGetSelectionArray("LevelFilter");
        //let supportConfigs = MySource.documentGetSelectionArrayByClass("SupportConfigurations");

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

        data.Servants.forEach((servant) => {
            //if (servant.ID == "ID356") console.log(servant);
            servant.DamageCalculations.forEach((calc) => {
                if (servantFilter.length > 0) {
                    let servantMatch = servant.Name.toLowerCase().includes(servantFilter.toLowerCase());
                    if (!servantMatch) {
                        //console.log("servant mismatch, removed");
                        return;
                    }
                }

                let targetTypeMatch = targetTypes.includes(calc.NoblePhantasm.TargetType);
                if (!targetTypeMatch) {
                    //console.log("targetTypeMatch mismatch, removed");
                    return;
                }

                let classMatch = classes.includes(calc.ClassType);
                if (!classMatch) {
                    //console.log("classMatch mismatch, removed");
                    return;
                }

                let cardTypeMatch = cardTypes.includes(calc.NoblePhantasm.CardType);
                if (!cardTypeMatch) {
                    //console.log("cardTypeMatch mismatch, removed");
                    return;
                }

                let OCmatch = OCLevels.includes(calc.OCLevel);
                if (!OCmatch) {
                    //console.log("OCmatch mismatch, removed");
                    return;
                }

                let traitMatch = calc.Traits.length == 0 || (Traits.length > 0 && checker(calc.Traits, Traits));
                if (!traitMatch) {
                   // console.log("traitMatch mismatch, removed");
                    return;
                }

                let FreeNp5 = servant.IsFree && calc.NPLevel == 5;
                let NPLevelMatch = !servant.IsFree && NPLevels.includes(calc.NPLevel);
                if (!NPLevelMatch && !FreeNp5) {
                    //console.log("NPLevelMatch mismatch, removed");
                    return;
                }

                let LevelMatch = levelFilter.includes(calc.ServantLevel.toString());
                if (!LevelMatch) {
                    console.log("levelMatch mismatch, removed");
                    return;
                }

                let supportConfiguration = defaultSupportConfiguration;
                let selectedConfiguration = this.SupportConfigurations.filter((item) => {
                    let checked = document.getElementById(item.ID).checked;
                    let npmatch = item.NPType == calc.NoblePhantasm.CardType;
                    return checked && npmatch
                })[0];

                if (selectedConfiguration != null) {
                    supportConfiguration = selectedConfiguration;
                    console.log(defaultSupportConfiguration, selectedConfiguration);
                };

                let damageCalculation = damage.CalculateDamage(servant, enemy, calc, supportConfiguration);
                this.dataSource.push(damageCalculation);
            });
        });

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
}