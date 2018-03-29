var clipboard = new ClipboardJS(".link", {
    target: function (trigger) {
        //console.log(trigger);
        return trigger;
    }
});

$(".link").each(function () {
    $(this).attr("data-toggle", "tooltip")
    $(this).on("mouseleave", clearTooltip);
    $(this).on("blur", clearTooltip);
    $(this).tooltip()
});


function clearTooltip(e) {
    console.log(e.currentTarget);
    e.currentTarget.setAttribute("class", "link");
    e.currentTarget.removeAttribute("aria-label");
}

function showTooltip(elem, msg) {

    elem.attr("data-title", msg);
    elem.tooltip("show");
}

function fallbackMessage(action) {
    var actionMsg = "";
    var actionKey = (action === "cut" ? "X" : "C");

    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = "No support :(";
    }
    else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = "Press ⌘-" + actionKey + " to " + action;
    }
    else {
        actionMsg = "Press Ctrl-" + actionKey + " to " + action;
    }

    return actionMsg;
}
clipboard.on("success", function (e) {
    e.clearSelection();

    showTooltip(e.trigger, "Copied!");
});

clipboard.on("error", function (e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});