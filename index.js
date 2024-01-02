let application = new Application();

data.Traits.sort().forEach((item) => {
    MySource.insertInput("checkbox", "EnemyTraitsList", item, item);
});

document.getElementById("Column_ID").addEventListener('click', function () {
    SortByID();
    application.OnFilterChange();
});

document.getElementById("Column_Servant").addEventListener('click', function () {
    SortByServant();
    application.OnFilterChange();
});

document.getElementById("Column_Class").addEventListener('click', function () {
    SortByClass();
    application.OnFilterChange();
});

document.getElementById("Column_Attack").addEventListener('click', function () {
    SortByAttack();
    application.OnFilterChange();
});

document.getElementById("Column_Damage").addEventListener('click', function () {
    SortByDamage();
    application.OnFilterChange();
});

document.getElementById("Column_AttackRating").addEventListener('click', function () {
    SortByAttackRating();
    application.OnFilterChange();
});

document.getElementById("NPLevelReset").onclick = function () {
    NPLevelReset();
    application.OnFilterChange();
};

document.getElementById("NPLevelSelectAll").onclick = function () {
    NPLevelSelectAll();    
    application.OnFilterChange();
};

document.getElementById("OCLevelReset").onclick = function () {
    OCLevelReset();
    application.OnFilterChange();
};

document.getElementById("OCLevelSelectAll").onclick = function () {
    OCLevelSelectAll();
    application.OnFilterChange();
};

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

document.getElementById("ConfigReset").onclick = function () {
    Reset();
    application.OnFilterChange();
};

document.getElementById("ConfigAllMax").onclick = function () {
    Reset();
    LevelFilterSelect(120);
    TargetFilterSelectAll();
    NPLevelSelect(5);
    application.OnFilterChange();
};

[].forEach.call(document.querySelectorAll(".SupportDiv .SupportCount0"), function (el) {
    el.onclick = function () {
        application.OnSupportClick(el.id);
    };
});

Reset();
application.OnFilterChange();