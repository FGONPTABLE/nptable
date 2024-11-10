class MySource {
    static getSortableField() {
        return {
            enabled: false,
            asc: true
        };
    }

    static sortString(a, b, asc = true) {
        let nameA = a.toUpperCase();
        let nameB = b.toUpperCase();

        if (!asc)
            [nameA, nameB] = [nameB, nameA];

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    }

    static sortInt(a, b, asc = true) {
        if (!asc)
            [a, b] = [b, a];
        return a - b;
    }

    static documentGetSelectionArrayInt(elementId) {
        let array = [];
        let checkboxes = document.getElementById(elementId).querySelectorAll('input[type=checkbox]:checked');
        for (let i = 0; i < checkboxes.length; i++) {
            array.push(parseInt(checkboxes[i].value))
        }
        return array;
    }

    static documentGetSelectionArray(elementId) {
        let array = [];
        let checkboxes = document.getElementById(elementId).querySelectorAll('input[type=checkbox]:checked');
        for (let i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        //return array;
        return array.map(v => v.toLowerCase());
    }

    static documentGetSelectionArrayByClass(className) {
        let array = [];
        let checkboxes = document.querySelectorAll('.' + className + ' input[type=checkbox]:checked');
        for (let i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        //return array;
        return array.map(v => v.toLowerCase());
    }

    static documentGetRadio(elementId) {
        let checkboxes = document.getElementById(elementId).querySelectorAll('input[type=radio]:checked');
        //return checkboxes[0].id;
        return checkboxes[0].id.toLowerCase();
    }

    static documentGetCheckedFloatValue(elementId) {
        var checkboxes = document.getElementById(elementId).parentNode.querySelectorAll('input[type=checkbox]:checked');
        if (checkboxes.length == 0)
            return 0.0;
        return parseFloat(checkboxes[0].value);
    }

    static documentGetTextValue(elementId) {
        return document.getElementById(elementId).value;
    }

    static IsChecked(elementId) {
        return document.getElementById(elementId).checked;
    }

    static Check(elementId) {
        return document.getElementById(elementId).checked = true;
    }

    static Uncheck(elementId) {
        return document.getElementById(elementId).checked = false;
    }

    static insertInput(type, parentElementId, elementId, name, checked = false) {
        var element = document.getElementById(parentElementId);

        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content-div");

        var input = document.createElement("input");
        input.type = type;
        input.id = elementId;
        input.name = parentElementId;
        input.checked = checked;
        input.value = elementId;

        var label = document.createElement("label");
        label.for = elementId;
        label.textContent = elementId;

        contentDiv.appendChild(input);
        contentDiv.appendChild(label);
        element.appendChild(contentDiv);
    }
}