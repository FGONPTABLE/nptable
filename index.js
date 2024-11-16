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

var BuffConfigCommon = function() {
    MySource.Check("NPEffectivenessUp");
    MySource.Check("UseAppends");

    MySource.Uncheck("np1");
    MySource.Uncheck("np2");
    MySource.Uncheck("np3");
    MySource.Uncheck("np4");
    MySource.Check("np5");

    MySource.Uncheck("OC5");
    MySource.Uncheck("OC2");
    MySource.Uncheck("OC3");
    MySource.Uncheck("OC4");
    MySource.Check("OC1");

    MySource.Check("Stack1");
    MySource.Check("Stack2");
    MySource.Check("Stack3");
    MySource.Check("Stack4");
    MySource.Check("Stack5");
    MySource.Check("Stack6");
    MySource.Check("Stack7");
    MySource.Check("Stack8");
    MySource.Check("Stack9");
    MySource.Check("Stack10");
    MySource.Check("Stack11");
    MySource.Check("Stack12");

    MySource.Uncheck("Include90");
    MySource.Uncheck("Include120");
    MySource.Check("Include100");

    application.Sort(application.sortFunctions.sortByDamage, false);
    application.OnFilterChange();
}

document.getElementById("BusterOlympics").onclick = function () {
    MySource.SetValue("cardBonus", 150);
    MySource.SetValue("servantAttackBonus", 4400);
    MySource.SetValue("attackBonus", 25);
    MySource.SetValue("NpBonus", 125);
    MySource.Check("Buster");
    MySource.Uncheck("Arts");
    MySource.Uncheck("Quick");
    BuffConfigCommon();
};

document.getElementById("ArtsOlympics").onclick = function () {
    MySource.SetValue("cardBonus", 100);
    MySource.SetValue("servantAttackBonus", 4400);
    MySource.SetValue("attackBonus", 65);
    MySource.SetValue("NpBonus", 125);
    MySource.Check("Arts");
    MySource.Uncheck("Buster");
    MySource.Uncheck("Quick");
    BuffConfigCommon();
};
document.getElementById("QuickOlympics").onclick = function () {
    MySource.SetValue("cardBonus", 130);
    MySource.SetValue("servantAttackBonus", 4400);
    MySource.SetValue("attackBonus", 55);
    MySource.SetValue("NpBonus", 125);
    MySource.Check("Quick");
    MySource.Uncheck("Buster");
    MySource.Uncheck("Arts");
    BuffConfigCommon();
};

document.getElementById("Debuffable").onclick = function () {
    TraitReset();
    MySource.Check("buffBound");
    MySource.Check("buffBurn");
    MySource.Check("buffCharm");
    MySource.Check("buffCurse");
    MySource.Check("buffMentalEffect");
    MySource.Check("buffNegativeEffect");
    MySource.Check("buffPoison");
    MySource.Check("burningLove");
    //MySource.Check("exaltation");
    MySource.Check("notProtectedByBBDubai");
    MySource.Check("skillSeal");
    MySource.Check("weakPointsRevealed");
    application.OnFilterChange();
};
document.getElementById("SetCommonTraits").onclick = function () {
    //MySource.Check("humanoid");
    MySource.Check("like");
    MySource.Check("magicBullet");
    MySource.Check("weakToEnumaElish");

    application.OnFilterChange();
};

document.getElementById("EnemyAttribute").addEventListener('change', function () {
    application.updateTraits();
    application.OnFilterChange();
});

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
    application.OnFilterChange();
};

[].forEach.call(document.querySelectorAll(".SupportDiv .SupportCount0"), function (el) {
    el.onclick = function () {
        application.OnSupportClick(el.id);
    };
});

Reset();
application.OnFilterChange();