let application = new Application();

application.GetTraits().sort().forEach((item) => {
    MySource.insertInput("checkbox", "EnemyTraitsList", item, item);
});

document.getElementById("Column_ID").addEventListener('click', function () {
    application.Sort(application.sortFunctions.sortByID);
    application.OnFilterChange();
});

document.getElementById("Column_Servant").addEventListener('click', function () {
    application.Sort(application.sortFunctions.sortByName);
    application.OnFilterChange();
});

document.getElementById("Column_Class").addEventListener('click', function () {
    application.Sort(application.sortFunctions.sortByClass);
    application.OnFilterChange();
});

document.getElementById("Column_Damage").addEventListener('click', function () {
    application.Sort(application.sortFunctions.sortByDamage);
    application.OnFilterChange();
});

document.getElementById("Column_Refund").addEventListener('click', function () {
    application.Sort(application.sortFunctions.sortByRefund);
    application.OnFilterChange();
});

document.getElementById("Column_AttackRating").addEventListener('click', function () {
    application.Sort(application.sortFunctions.sortByAttackRating);
    application.OnFilterChange();
});

document.getElementById("ClassReset").onclick = function () {
    ClassReset();
    application.OnFilterChange();
};

document.getElementById("ClassSelectAll").onclick = function () {
    ClassSelectAll();
    application.OnFilterChange();
};

document.getElementById("TraitReset").onclick = function () {
    TraitReset();
    application.OnFilterChange();
};

document.getElementById("TraitSelectAll").onclick = function () {
    TraitSelectAll();
    application.OnFilterChange();
};

document.getElementById("EnemyClass").addEventListener('change', function () {
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

document.getElementById("ConfigReset").onclick = function () {
    Reset();
    application.OnFilterChange();
};

document.getElementById("ConfigAllMax").onclick = function () {
    Reset();
    LevelFilterSelect(100);
    TargetFilterSelectAll();
    NPLevelSelect(5);
    //TraitSelect("Servant");
    //TraitSelect("StandardClassServant");
    //TraitSelect("Burn");
    //TraitSelect("Curse");
    //TraitSelect("Poison");
    //TraitSelect("SkillSeal");
    //TraitSelect("Bound");
    //TraitSelect("BuffCharm");
    //TraitSelect("BuffNegativeEffect");
    application.OnFilterChange();
};

[].forEach.call(document.querySelectorAll(".SupportDiv .SupportCount0"), function (el) {
    el.onclick = function () {
        application.OnSupportClick(el.id);
    };
});

Reset();
application.OnFilterChange();