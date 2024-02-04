console.log("Well to My Spotify")
let songs = [
    { songName: "Long Drive", filePath: "./music/Long_Drive.m4a", coverPath: "./covers/1.jpg", songLength: "04:28" },
    { songName: "Baby Girl", filePath: "./music/Baby_Girl.m4a", coverPath: "./covers/2.jpg", songLength: "03:43" },
    { songName: "Ishq Sufiyana", filePath: "./music/_Ishq_Sufiyana.m4a", coverPath: "./covers/3.jpg", songLength: "05:27" },
    { songName: "Tu Ake Dekhle", filePath: "./music/Tu_Aake_Dekhle.m4a", coverPath: "./covers/4.jfif", songLength: "05:02" },
    { songName: "Illegal Weapon 2.0", filePath: "./music/Illegal_Weapon_2.0.m4a", coverPath: "./covers/5.jfif", songLength: "02:27" },
    { songName: "Kar Gay Chull", filePath: "./music/Kar_Gayi_Chull.mp3", coverPath: "./covers/6.jpg", songLength: "02:27" },
    { songName: "Meri Zindagi Hai Tu", filePath: "./music/Meri zindagi hai tu.mpeg", coverPath: "./covers/5.jpg", songLength: "02:27" },
    { songName: "Duniya", filePath: "./music/Luka_Chuppi__Duniyaa.mp3", coverPath: "./covers/8.jpg", songLength: "02:27" }
]

// Initialize the Variables
let songIndex = 0;
let PreIndex = songIndex;
let length = songs.length;
let audioElement = new Audio(songs[songIndex].filePath);
document.getElementsByClassName('CurrentSongName')[0].innerText = songs[songIndex].songName;
let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let Progressbar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let SongItemPlay = Array.from(document.getElementsByClassName('SongItemPlay'));



const updateSong = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        let id1 = document.getElementById(songIndex);
        id1.classList.remove('fa-play');
        id1.classList.add('fa-pause');
    }
    else {
        let id1 = document.getElementById(songIndex);
        id1.classList.add('fa-play');
        id1.classList.remove('fa-pause');
    }
}

songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = songs[i].songLength;
    element.getElementsByClassName('SongName')[0].innerText = songs[i].songName;

})

const changeStyle = () => {
    songitem.forEach((element) => {
        element.style.background = 'black';
        // element.style.margin = '12px 30px';
    })
}

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    updateSong();
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        changeStyle();
        let parentclass = document.getElementsByClassName(songIndex);
        parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        changeStyle();
        let parentclass = document.getElementsByClassName(songIndex);
        // parentclass[0].style.margin = '0px 20px';
        parentclass[0].style.background = '#0b0b41';
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Progressbar.value = progress;
    if (Progressbar.value == 100) {
        let id1 = document.getElementById(songIndex);
        id1.classList.add('fa-play');
        id1.classList.remove('fa-pause');
        songIndex = (songIndex + 1) % length;
        audioElement.src = songs[songIndex].filePath;
        PreIndex = songIndex;
        audioElement.duration = 0;
        audioElement.play();
        changeStyle();
        let parentclass = document.getElementsByClassName(songIndex);
        parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        gif.style.opacity = 1;
        document.getElementsByClassName('CurrentSongName')[0].innerText = songs[songIndex].songName;
        id1 = document.getElementById(songIndex);
        id1.classList.remove('fa-play');
        id1.classList.add('fa-pause');
    }
})

Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
})

const makeAllPlay = () => {
    SongItemPlay.forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })

}

SongItemPlay.forEach((element) => {
    element.addEventListener('click', e => {
        songIndex = parseInt(e.target.id);
        makeAllPlay();

        if (audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = songs[songIndex].filePath;
            PreIndex = songIndex;
            audioElement.duration = 0;
            audioElement.play();
            changeStyle();
            let parentclass = document.getElementsByClassName(songIndex);
            parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        gif.style.opacity = 1;
            document.getElementsByClassName('CurrentSongName')[0].innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else if (audioElement.currentTime != 0 && audioElement.paused && PreIndex == songIndex) {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.play();
            changeStyle();
            let parentclass = document.getElementsByClassName(songIndex);
            parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else {
            if (PreIndex == songIndex) {
                audioElement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                changeStyle();
                let parentclass = document.getElementsByClassName(songIndex);
                parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        gif.style.opacity = 0;
                masterPlay.classList.add('fa-play');
                masterPlay.classList.remove('fa-pause');
            }
            else {
                audioElement.pause();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                audioElement.src = songs[songIndex].filePath;
                audioElement.play();
                document.getElementsByClassName('CurrentSongName')[0].innerText = songs[songIndex].songName;
                PreIndex = songIndex;
                changeStyle();
                let parentclass = document.getElementsByClassName(songIndex);
                parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            }
        }
    })
})

previous.addEventListener('click', () => {
    // console.log(songIndex);
    makeAllPlay();
    if (songIndex == 0) {
        songIndex = length - 1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.duration = 0;
    updateSong();
    audioElement.play();
    document.getElementsByClassName('CurrentSongName')[0].innerText = songs[songIndex].songName;
    changeStyle();
    let parentclass = document.getElementsByClassName(songIndex);
    parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

next.addEventListener('click', () => {
    // console.log(songIndex);
    makeAllPlay();
    songIndex = (songIndex + 1) % length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.duration = 0;
    updateSong();
    changeStyle();
    let parentclass = document.getElementsByClassName(songIndex);
    parentclass[0].style.background = '#0b0b41';
        // parentclass[0].style.margin = '0px 20px';
        audioElement.play();
    document.getElementsByClassName('CurrentSongName')[0].innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})