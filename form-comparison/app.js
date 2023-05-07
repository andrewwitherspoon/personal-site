import makeVideo from "./makeVideo.js";

///////////////////////////////////////////////////////////
// Drag and drop new files
///////////////////////////////////////////////////////////
let videoDropZone = document.querySelector(".video-drop-zone")
let videos = [];

videoDropZone.addEventListener("drop", dropHandler)
videoDropZone.addEventListener("dragover", dragOverHandler)

function dropHandler(e) {
  e.preventDefault();

  if (e.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...e.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          let videosObj = new makeVideo({
            url: reader.result,
            name: file.name
          });
          videos.push(videosObj)
        }
      }
    });
  }
}

function dragOverHandler(e) {
  e.preventDefault();
}

///////////////////////////////////////////////////////////
// Play videos
///////////////////////////////////////////////////////////
let playButton = document.querySelector("#play-button")
let iconPlay = document.querySelector("#icon-play")
let iconPause = document.querySelector("#icon-pause")
let isPlaying = false
let firstPlay = true;

playButton.addEventListener("click", handlePlay)

function handlePlay() {
  if (firstPlay == true) {
    isPlaying = true
    firstPlay = false 
    videos.forEach(d=> d.play())
    iconPlay.style.display = "block"
    iconPause.style.display = "none"
  } if (isPlaying == true && firstPlay == false) {
    isPlaying = false
    videos.forEach(d=> d.play())
    iconPlay.style.display = "none"
    iconPause.style.display = "block"
  } else {
    isPlaying = true
    videos.forEach(d=> d.pause())
    iconPlay.style.display = "block"
    iconPause.style.display = "none"

  }
}

///////////////////////////////////////////////////////////
// Video scrubber
///////////////////////////////////////////////////////////
let scrubber = document.querySelector("#video-scrubber")

scrubber.addEventListener("input", (e) => {
  let position = e.target.value;
  document.querySelectorAll("video").forEach(video=> {
    video.currentTime = video.duration * position
  })
})