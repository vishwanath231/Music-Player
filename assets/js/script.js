const musicContainer = document.querySelector(".music__container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress__container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const authors = document.querySelector("#author");


const currenttimetext = document.getElementById("currenttimetext");
const durationtimetext = document.getElementById("durationtimetext");



// author
const author = ['Billie Eillish ,Khalid','The Chainsmokers, Halsey','Duncan Laurance']

// author index
let authorIndex = 2;

// author name
loads(author[authorIndex]);
function loads(name){
    authors.innerHTML = name;
}



// song titles
const songs = ['lovely','closer','arcade']

// keep track of song
let songIndex = 2;

//Initially load song info DOM
loadSong(songs[songIndex])


// Update song details
function loadSong(song) {
   title.innerHTML = song
   audio.src = `assets/audio/${song}.mp3`
   cover.src = `assets/img/${song}.jpg`
}


function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector("i.fas").classList.remove('fa-play');
    playBtn.querySelector("i.fas").classList.add('fa-pause');
    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector("i.fas").classList.add('fa-play');
    playBtn.querySelector("i.fas").classList.remove('fa-pause');
    audio.pause()

}


function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    authorIndex--;
    if (authorIndex < 0) {
        authorIndex = author.length - 1 ;
    }

    loadSong(songs[songIndex])
    loads(author[authorIndex]);

    playSong();

}


function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1 ) {
        songIndex = 0;
    }

    authorIndex++;
    if (authorIndex > author.length - 1 ) {
        authorIndex = 0;
    }

    loadSong(songs[songIndex])
    loads(author[authorIndex]);
    playSong();
}


function updateProgress(e) {
   
    const {currentTime, duration} = e.srcElement;
    const progressPrecent = (currentTime / duration) * 100;
    progress.style.width = `${progressPrecent}%`;

    if(audio.duration){
        var nt = progressPrecent;
        progress.value = nt;
        var curmins = Math.floor(audio.currentTime / 60); 
        var cursecs = Math.floor(audio.currentTime - curmins * 60); 
        var durmins = Math.floor(audio.duration / 60); 
        var dursecs = Math.floor(audio.duration - durmins * 60); 
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        currenttimetext.innerHTML = curmins+":"+cursecs;
        durationtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        currenttimetext.innerHTML = "00"+":"+"00";
        durationtimetext.innerHTML = "00"+":"+"00";
    }
}


function setProgress(e) {
    const width = this.clientWidth;
    const click = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (click / width ) * duration

    
} 


// Event listener

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong()
    }else{
        playSong()
    }
})



// change song event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);


audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);




// DARK AND LIGHT MODE

const dayNight = document.querySelector(".theme")

dayNight.addEventListener("click", () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme","dark");
    }else {
        localStorage.setItem("theme","light");
    }
    updateIcon();
})

function themeMode() {

    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") == "light") {
            document.body.classList.remove("dark")
        }else{
            document.body.classList.add("dark")

        }
    }
    updateIcon();

}
themeMode();

function updateIcon() {
    if (document.body.classList.contains('dark')) {
        dayNight.querySelector("i").classList.add("fa-sun")
        dayNight.querySelector("i").classList.remov("fa-moon")
    }else{
        dayNight.querySelector("i").classList.remove("fa-sun")
        dayNight.querySelector("i").classList.add("fa-moon ")
    }
}


// function theme() {
//     var element = document.body;

//     if (element.classList.toggle("dark")) {
        
//         condocument.querySelector("i").className = "fas fa-sun";
//     }
//     else{

//         document.querySelector("i").className = "fas fa-moon";
//     }
    

// }