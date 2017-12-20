function changeEventHandler(e) {
    document.querySelector(`#${e.target.value}`).disabled = !e.target.checked;
}

document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('input[name="stylesheets"]');
    var i;

    for (i = 0; i < checkboxes.length; ++i) {
        document.querySelector(`input[value="${checkboxes[i].value}"]`).onchange = changeEventHandler;
    }
}, false);
