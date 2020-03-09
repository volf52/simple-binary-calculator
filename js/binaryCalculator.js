const createElement = (type, innerHTML, attribObj) => {
    const elem = document.createElement(type);
    elem.innerHTML = innerHTML;
    for (var key of Object.keys(attribObj))
        elem.setAttribute(key, attribObj[key]);
    return elem;
};

const addClickCallback = (query, callBackFunc) => {
    [...document.querySelectorAll(query)].map(elem => {
        elem.addEventListener("click", callBackFunc);
    });
};

const reset = resDiv => {
    resDiv.innerHTML = "";
    return {
        op1: "",
        op2: "",
    };
};

const performOp = (oper1, oper2, op) => {
    const res = eval(`${parseInt(oper1, 2)} ${op} ${parseInt(oper2, 2)}`);
    return Math.floor(res).toString(2);
};

function onReady() {
    let data = { op1: "", op2: "" };
    const outerDiv = document.getElementById("calculator");
    const resDiv = document.getElementById("res");
    if (outerDiv === undefined) return;
    if (resDiv === undefined) return;

    addClickCallback(".digitButton", e => {
        const elem = e.target || e.srcElement;
        resDiv.innerHTML += elem.innerHTML;
        if (data["op"] === undefined) {
            data["op1"] += elem.innerHTML;
        } else {
            data["op2"] += elem.innerHTML;
        }
    });

    addClickCallback(".opButton", e => {
        const elem = e.target || e.srcElement;
        if (data["op1"] === "") {
            alert("Enter first operand before pressing op button");
            return;
        }
        if (data["op"] !== undefined) {
            if (data["op2"] === "") {
                alert("Can't enter two ops in a row");
                return;
            }
            data["op1"] = performOp(data["op1"], data["op2"], data["op"]);
            data["op2"] = "";
            resDiv.innerHTML = data["op1"];
        }
        data["op"] = elem.innerHTML;
        resDiv.innerHTML += elem.innerHTML;
    });

    document.getElementById("btnClr").addEventListener("click", e => {
        console.log(data);
        data = reset(resDiv);
        console.log(data);
    });

    document.getElementById("btnEql").addEventListener("click", e => {
        if (data["op1"] === undefined) {
            alert("Can't perform an operation on empty string, dumbass");
            return;
        }
        if (data["op"] === undefined) {
            alert("Enter operation and second operand before pressing equal");
            return;
        }
        if (data["op2"] === undefined) {
            alert("Enter second operand before pressing equal");
            return;
        }

        data["op1"] = performOp(data["op1"], data["op2"], data["op"]);
        data["op2"] = "";
        data["op"] = undefined;
        resDiv.innerHTML = data["op1"];
    });
}
