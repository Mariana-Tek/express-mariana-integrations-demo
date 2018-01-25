function toggleStylesheet(e) {
    document.querySelector(`#${e.target.value}`).disabled = !e.target.checked;
}

function toggleSiteMeta() {
    var hideText = document.querySelector('#toggle-meta-hide-text');
    var siteMeta = document.querySelector('#site-meta');
    var viewMeta = document.querySelector('#toggle-meta-view-text');

    hideText.hidden = !hideText.hidden;
    siteMeta.hidden = !siteMeta.hidden;
    viewMeta.hidden = !viewMeta.hidden;
}

document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('input[name="stylesheets"]');
    var checkboxIndex;

    for (checkboxIndex = 0; checkboxIndex < checkboxes.length; ++checkboxIndex) {
        document.querySelector(`input[value="${checkboxes[checkboxIndex].value}"]`).onchange = toggleStylesheet;
    }

    document.querySelector('#toggle-meta-button').onclick = toggleSiteMeta;
}, false);
