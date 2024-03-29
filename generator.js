function isValid() {
    let noError = true;
    let noWarning = true;
    let fatalErrorList = [];
    let warningList = [];
    const fatalError = [
        ["musicGlobal", "Music File is missing!"],
        ["musicPreview", "Music Preview is missing!"],
        ["chartVersion", "Invalid chart version"],
        ["chartAuthor", "Invalid Author input"],
        ["musicTitle", "Invalid music title"]
    ];
    const warning = [
        ["musicSource", "No Music Source"],
        ["pictureAuthor", "No Picture Author"],
        ["pictureSource", "No Picture Source"]
    ]

}

function generate() {
    let base = {
        "version": -1,
        "schema_version": 2,
        "id": "",
        "title": "",
        "title_localized": "",
        "artist": "",
        "artist_localized": "",
        "artist_source": "",
        "illustrator": "",
        "illustrator_source": "",
        "charter": "",
        "music": {
            "path": ""
        },
        "music_preview": {
            "path": ""
        },
        "background": {
            "path": ""
        },
        "charts": []
    }

    base.version = document.getElementById("chartVersion").value

    base.charter = document.getElementById("chartAuthor").value

    base.title = document.getElementById("musicTitle").value

    base.id = document.getElementById("chartID").value
    if (base.id === '') base.id = base.charter.toLowerCase() + "." + base.title.toLowerCase()


    document.getElementById("musicTitleLocal").value === '' ? delete base.title_localized : base.title_localized = document.getElementById("musicTitleLocal").value

    base.artist = document.getElementById("musicArtist").value

    document.getElementById("musicArtistLocal").value === '' ? delete base.artist_localized : base.artist_localized = document.getElementById("musicArtistLocal").value

    base.artist_source = document.getElementById("musicSource").value

    base.illustrator = document.getElementById("pictureAuthor").value

    base.illustrator_source = document.getElementById("pictureSource").value

    base.music.path = document.getElementById("musicGlobal").value.split('\\').pop().split('/').pop();

    base.music_preview = document.getElementById("musicPreview").value.split('\\').pop().split('/').pop();

    base.background.path = document.getElementById("backgroundImage").value;

    base.charts = getChartList(base.charts)

    document.getElementById("hidingDiv").classList.remove("hiddendiv")

    document.getElementById("outputContainer").innerHTML = JSON.stringify(base, null, 2)
}

function getChartList(array) {
    if (document.getElementById("checkBoxEasy").checked) {
        const diffCharts = {
            "type": "easy",
            "difficulty": -1,
            "path": "",
        }
        diffCharts.difficulty = document.getElementById("diffEasy").value
        diffCharts.path = document.getElementById("chartFileEasy").value
        if (document.getElementById("musicFileEasy").value !== '') diffCharts['music_override'] = {"path": document.getElementById("musicFileEasy").value}.split('\\').pop().split('/').pop()
        if (document.getElementById("storyboardFileEasy").value !== '') diffCharts['storyboard'] = {"path": document.getElementById("storyboardFileEasy").value}
        if (document.getElementById("customNameEasy").value !== '') diffCharts['name'] = document.getElementById("customNameEasy").value
        array.push(diffCharts)
    }
    if (document.getElementById("checkBoxHard").checked) {
        const diffCharts = {
            "type": "hard",
            "difficulty": -1,
            "path": "",
        }
        diffCharts.difficulty = document.getElementById("diffHard").value
        diffCharts.path = document.getElementById("chartFileHard").value
        if (document.getElementById("musicFileHard").value !== '') diffCharts['music_override'] = {"path": document.getElementById("musicFileHard").value}
        if (document.getElementById("storyboardFileHard").value !== '') diffCharts['storyboard'] = {"path": document.getElementById("storyboardFileHard").value}
        if (document.getElementById("customNameHard").value !== '') diffCharts['name'] = document.getElementById("customNameHard").value
        array.push(diffCharts)
    }
    if (document.getElementById("checkBoxExtreme").checked) {
        const diffCharts = {
            "type": "extreme",
            "difficulty": -1,
            "path": "",
        }
        diffCharts.difficulty = document.getElementById("diffExtreme").value
        diffCharts.path = document.getElementById("chartFileExtreme").value
        if (document.getElementById("musicFileExtreme").value !== '') diffCharts['music_override'] = {"path": document.getElementById("musicFileExtreme").value}
        if (document.getElementById("storyboardFileExtreme").value !== '') diffCharts['storyboard'] = {"path": document.getElementById("storyboardFileExtreme").value}
        if (document.getElementById("customNameExtreme").value !== '') diffCharts['name'] = document.getElementById("customNameExtreme").value
        array.push(diffCharts)
    }
    return array
}