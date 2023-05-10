window.addEventListener('load', function () {
    let areaexterna = document.querySelector('#areaexterna');
    let areainterna = document.querySelector('#areainterna');

    areaexterna.addEventListener('change', function () {
        if (this.checked) {
            let url = window.location.href + "/2";
            window.location.href = url;
        }
    });

    areainterna.addEventListener('change', function () {
        if (this.checked) {
            let url = window.location.href + "/1"
            window.location.href = url;
        }
    });
})
