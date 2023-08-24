class Application {
    dataSource = [];

    dataSort = {
        sortByID: MySource.getSortableField(),
        sortByName: MySource.getSortableField(),
        sortByClass: MySource.getSortableField(),
        sortByAttack: MySource.getSortableField(),
        sortByDamage: MySource.getSortableField()
    };

    updateDataSource() {
        this.dataSource = [];

        let classes = MySource.documentGetSelectionArray("PlayerClasses");
        let cardTypes = MySource.documentGetSelectionArray("CardType");
        let NPLevels = MySource.documentGetSelectionArrayInt("NPLevels");
        let OCLevels = MySource.documentGetSelectionArrayInt("OCLevels");
        let Traits = MySource.documentGetSelectionArray("EnemyTraits");
        let targetTypes = MySource.documentGetSelectionArray("TargetFilter");
        let levelFiler = MySource.documentGetSelectionArray("LevelFilter");

        let maxLevel = Math.max(90, Math.max.apply(null, levelFiler));
        let checker = (arr, target) => arr.every(v => target.includes(v));

        let enemy = data.Enemy;
        enemy.Class = MySource.documentGetRadio("EnemyClass");
        enemy.Attribute = MySource.documentGetRadio("EnemyAttribute");

        data.Servants.forEach((servant) => {
            servant.DamageCalculations.forEach((calc) => {

                let targetTypeMatch = targetTypes.includes(calc.NoblePhantasm.TargetType);
                if (!targetTypeMatch)
                    return;

                let classMatch = classes.includes(calc.ClassType);
                if (!classMatch)
                    return;

                let cardTypeMatch = cardTypes.includes(calc.NoblePhantasm.CardType);
                if (!cardTypeMatch)
                    return;

                let OCmatch = OCLevels.includes(calc.OCLevel);
                if (!OCmatch)
                    return;

                let traitMatch = calc.Traits.length == 0 || (Traits.length > 0 && checker(calc.Traits, Traits));
                if (!traitMatch)
                    return;

                let NPLevelMatch = !servant.IsFree && NPLevels.includes(calc.NPLevel);
                if (!NPLevelMatch)
                    return;

                let FreeNp5 = servant.IsFree && calc.NPLevel == 5;
                let LevelMatch = calc.ServantLevel <= maxLevel;
                if (!(FreeNp5 || LevelMatch))
                    return;

                let damageCalculation = DamageCalculation.CalculateDamage(servant, enemy, calc);
                this.dataSource.push(damageCalculation);
            });
        });

        if (this.dataSort.sortByID.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.ID, b.inputServant.ID, this.dataSort.sortByID.asc));

        else if (this.dataSort.sortByName.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.Name, b.inputServant.Name, this.dataSort.sortByName.asc));

        else if (this.dataSort.sortByClass.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortString(a.inputServant.Class, b.inputServant.Class, this.dataSort.sortByClass.asc));

        else if (this.dataSort.sortByAttack.enabled)
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.ServantAttack, b.ServantAttack, this.dataSort.sortByAttack.asc));

        else //sort by damage by default
            this.dataSource = this.dataSource.sort((a, b) => MySource.sortInt(a.CalculatedDamage, b.CalculatedDamage, this.dataSort.sortByDamage.asc));
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

            let row = tbody.insertRow(tbody.rows.length);

            let idNode = document.createElement("span");
            idNode.appendChild(document.createTextNode(item.inputServant.ID));
            idNode.classList.add("UUID");
            idNode.id = item.uuid;

            idNode.addEventListener('click', function () {
                console.log(application.dataSource.find((element) => element.uuid == idNode.id));
            });

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

            if (ShowTraits)
                row.insertCell().append(traitRow);

            if (ShowDetails)
                row.insertCell().append(effectRow);
        });
    };

    sortReset() {
        this.dataSort.sortByID.enabled = false;
        this.dataSort.sortByName.enabled = false;
        this.dataSort.sortByAttack.enabled = false;
        this.dataSort.sortByDamage.enabled = false;
    }

    OnFilterChange() {
        this.updateDataSource();
        this.updateTable();
    }
}

let application = new Application();

data.Traits.forEach((item) => {
    MySource.insertChechBox("checkbox", "EnemyTraits", item, item);
});

data.Classes.forEach((item) => {
    MySource.insertChechBox("checkbox", "PlayerClasses", item, item, true);
});

document.querySelectorAll('input').forEach((e) => {
    e.addEventListener('change', function () {
        application.OnFilterChange();
    });
});

document.getElementById("Column_ID").addEventListener('click', function () {
    application.sortReset();
    application.dataSort.sortByID.enabled = true;
    application.dataSort.sortByID.asc = !application.dataSort.sortByID.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Servant").addEventListener('click', function () {
    application.sortReset();
    application.dataSort.sortByName.enabled = true;
    application.dataSort.sortByName.asc = !application.dataSort.sortByName.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Class").addEventListener('click', function () {
    application.sortReset();
    application.dataSort.sortByClass.enabled = true;
    application.dataSort.sortByClass.asc = !application.dataSort.sortByClass.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Attack").addEventListener('click', function () {
    application.sortReset();
    application.dataSort.sortByAttack.enabled = true;
    application.dataSort.sortByAttack.asc = !application.dataSort.sortByAttack.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Damage").addEventListener('click', function () {
    application.sortReset();
    application.dataSort.sortByDamage.enabled = true;
    application.dataSort.sortByDamage.asc = !application.dataSort.sortByDamage.asc;
    application.OnFilterChange();
});

application.dataSort.sortByDamage.enabled = true;
application.dataSort.sortByDamage.asc = false;
application.OnFilterChange();