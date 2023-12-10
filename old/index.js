let application = new Application();

data.Traits.sort().forEach((item) => {
    MySource.insertInput("checkbox", "EnemyTraitsList", item, item);
});

/*
data.Classes.forEach((item) => {
    MySource.insertInput("checkbox", "ClassesContent", item, item, true);
});
*/

document.getElementById("Column_ID").addEventListener('click', function () {
    application.sortReset();
    application.sortFunctions.sortByID.enabled = true;
    application.sortFunctions.sortByID.asc = !application.sortFunctions.sortByID.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Servant").addEventListener('click', function () {
    application.sortReset();
    application.sortFunctions.sortByName.enabled = true;
    application.sortFunctions.sortByName.asc = !application.sortFunctions.sortByName.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Class").addEventListener('click', function () {
    application.sortReset();
    application.sortFunctions.sortByClass.enabled = true;
    application.sortFunctions.sortByClass.asc = !application.sortFunctions.sortByClass.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Attack").addEventListener('click', function () {
    application.sortReset();
    application.sortFunctions.sortByAttack.enabled = true;
    application.sortFunctions.sortByAttack.asc = !application.sortFunctions.sortByAttack.asc;
    application.OnFilterChange();
});

document.getElementById("Column_Damage").addEventListener('click', function () {
    application.sortReset();
    application.sortFunctions.sortByDamage.enabled = true;
    application.sortFunctions.sortByDamage.asc = !application.sortFunctions.sortByDamage.asc;
    application.OnFilterChange();
});

document.getElementById("Column_AttackRating").addEventListener('click', function () {
    application.sortReset();
    application.sortFunctions.sortByAttackRating.enabled = true;
    application.sortFunctions.sortByAttackRating.asc = !application.sortFunctions.sortByAttackRating.asc;
    application.OnFilterChange();
});

document.getElementById("NPLevelReset").onclick = function () {
    document.getElementById("NPLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    });
    document.getElementById("np1").checked = true;
    application.OnFilterChange();
};

document.getElementById("NPLevelSelectAll").onclick = function () {
    document.getElementById("NPLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    });
    application.OnFilterChange();
};

document.getElementById("OCLevelReset").onclick = function () {
    document.getElementById("OCLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    });
    document.getElementById("OC1").checked = true;
    application.OnFilterChange();
};

document.getElementById("OCLevelSelectAll").onclick = function () {
    document.getElementById("OCLevels").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    });
    application.OnFilterChange();
};

document.getElementById("ResetSupportConfiguration").onclick = function () {
    document.getElementById("BusterSupportConfigurationsDefault").checked = true;
    document.getElementById("ArtsSupportConfigurationsDefault").checked = true;
    document.getElementById("QuickSupportConfigurationsDefault").checked = true;
    application.OnFilterChange();
};

document.getElementById("ClassReset").onclick = function () {
    document.getElementById("PlayerClasses").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    });
    application.OnFilterChange();
};

document.getElementById("ClassSelectAll").onclick = function () {
    document.getElementById("PlayerClasses").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    });
    application.OnFilterChange();
};

document.getElementById("TraitReset").onclick = function () {
    document.getElementById("EnemyTraits").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = false;
    });
    application.OnFilterChange();
};

document.getElementById("TraitSelectAll").onclick = function () {
    document.getElementById("EnemyTraits").querySelectorAll('input[type=checkbox]').forEach((item) => {
        item.checked = true;
    });
    application.OnFilterChange();
};

document.getElementById("EnemyClass").addEventListener('change', function () {
    application.updateTraits();
    application.OnFilterChange();
});

document.getElementById("EnemyAttribute").addEventListener('change', function () {
    application.updateTraits();
    application.OnFilterChange();
});

document.querySelectorAll('input').forEach((e) => {
    if (e.closest('.custom-handler') == null) {
        e.addEventListener('change', function () {
            console.log("generic filter change");
            application.OnFilterChange();
        });
    };    
});

application.sortFunctions.sortByDamage.enabled = true;
application.sortFunctions.sortByDamage.asc = false;
application.OnFilterChange();