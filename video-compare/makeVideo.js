export default class makeVideo {

  constructor(opts) {
    Object.assign(this, opts);
    this.valX = 0
    this.valY = 0
    this.valScale = 1
    this.settingsOpen = true

    this.makeVideo()
  }

  makeVideo() {
    let videoList = document.querySelector(".video-list")
    this.id = makeID(5);

    // Make video container
    this.videoContainer = document.createElement("div")
      this.videoContainer.classList.add("video-container", `id-${this.id}`)

    // Make video
    this.video = document.createElement('video')
      this.video.src = this.url
      this.video.dataset.start = 0
      this.video.dataset.end = null
      this.video.dataset.duration = null
      this.video.dataset.speed = this.video.playbackRate

    // Make video settings container
    this.videoSettings = document.createElement("div")
      this.videoSettings.classList.add("video-settings-container", "active")

      // Make multi-range slider
      this.multiRangeSliderContainer = document.createElement("div")
        this.multiRangeSliderContainer.classList.add("multi-range-slider")

        this.multiRangeSliderLabel = document.createElement("p")
          this.multiRangeSliderLabel.classList.add("video-settings-label")
          this.multiRangeSliderLabel.innerText = "Trim"
          this.multiRangeSliderContainer.append(this.multiRangeSliderLabel)

        this.inputLeft = document.createElement("input")
          this.inputLeft.classList.add("range-input")
          this.inputLeft.setAttribute("type", "range")
          this.inputLeft.setAttribute("min", "0")
          this.inputLeft.setAttribute("max", "100")
          this.inputLeft.setAttribute("value", "0")
          this.inputLeft.setAttribute("step", "any")
          this.multiRangeSliderContainer.append(this.inputLeft)

        this.inputRight = document.createElement("input")
          this.inputRight.classList.add("range-input")
          this.inputRight.setAttribute("type", "range")
          this.inputRight.setAttribute("min", "0")
          this.inputRight.setAttribute("max", "100")
          this.inputRight.setAttribute("value", "100")
          this.inputRight.setAttribute("step", "any")
          this.multiRangeSliderContainer.append(this.inputRight)

      this.videoSettings.appendChild(this.multiRangeSliderContainer)

      this.hiddenSliderContainer = document.createElement("div")
        this.hiddenSliderContainer.classList.add("hidden-slider-container")
      
        this.hiddenSliderTrack = document.createElement("div")
          this.hiddenSliderTrack.classList.add("hidden-slider-track")
          this.hiddenSliderContainer.append(this.hiddenSliderTrack)
        
        this.hiddenSliderRange = document.createElement("div")
          this.hiddenSliderRange.classList.add("hidden-slider-range")
          this.hiddenSliderContainer.append(this.hiddenSliderRange)
        
        this.hiddenSliderThumbLeft = document.createElement("div")
          this.hiddenSliderThumbLeft.classList.add("hidden-slider-thumb", "left")
          this.hiddenSliderContainer.append(this.hiddenSliderThumbLeft)

        this.hiddenSliderThumbRight = document.createElement("div")
          this.hiddenSliderThumbRight.classList.add("hidden-slider-thumb", "right")
          this.hiddenSliderContainer.append(this.hiddenSliderThumbRight)

        this.multiRangeSliderContainer.appendChild(this.hiddenSliderContainer)

      this.inputLeft.addEventListener("input", (e) => this.handleTrimInput(e, "left"));
      this.inputRight.addEventListener("input", (e) => this.handleTrimInput(e, "right"));

      this.inputLeft.addEventListener("mouseover", () => this.hiddenSliderThumbLeft.classList.add("hover"))
      this.inputLeft.addEventListener("mouseout", () => this.hiddenSliderThumbLeft.classList.remove("hover"))
      this.inputLeft.addEventListener("mousedown", () => this.hiddenSliderThumbLeft.classList.add("active"))
      this.inputLeft.addEventListener("mouseup", () => this.hiddenSliderThumbLeft.classList.remove("active"))

      this.inputRight.addEventListener("mouseover", () => this.hiddenSliderThumbRight.classList.add("hover"))
      this.inputRight.addEventListener("mouseout", () => this.hiddenSliderThumbRight.classList.remove("hover"))
      this.inputRight.addEventListener("mousedown", () => this.hiddenSliderThumbRight.classList.add("active"))
      this.inputRight.addEventListener("mouseup", () => this.hiddenSliderThumbRight.classList.remove("active"))

    // Make row with positioning inputs
    this.positionInputContainer = document.createElement("div")
      this.positionInputContainer.classList.add("input-row")
      this.videoSettings.append(this.positionInputContainer)

    this.scaleInputContainer = document.createElement("div")
      this.scaleInputContainer.classList.add("scale-input-container")
      this.positionInputContainer.append(this.scaleInputContainer)

    this.scaleInputLabel = document.createElement("p")
      this.scaleInputLabel.classList.add("video-settings-label")
      this.scaleInputLabel.innerText = "Scale"
      this.scaleInputContainer.append(this.scaleInputLabel)

    this.scaleInput = document.createElement("input")
      this.scaleInput.classList.add("scale-input")
      this.scaleInput.setAttribute("type", "range")
      this.scaleInput.setAttribute("min", "1")
      this.scaleInput.setAttribute("max", "3")
      this.scaleInput.setAttribute("value", "1")
      this.scaleInput.setAttribute("step", "any")
      this.scaleInputContainer.append(this.scaleInput)

    this.translateContainer = document.createElement("div")
      this.translateContainer.classList.add("translate-container")
      this.positionInputContainer.append(this.translateContainer)

    this.translateInputLabel = document.createElement("p")
      this.translateInputLabel.classList.add("video-settings-label")
      this.translateInputLabel.innerText = "Move (x,y)"
      this.translateContainer.append(this.translateInputLabel)

    this.translateXInput = document.createElement("input")
    this.translateXInput.classList.add("transform-x-input")
      this.translateXInput.setAttribute("type", "number")
      this.translateXInput.setAttribute("placeholder", "x")
      this.translateXInput.setAttribute("min", "-100")
      this.translateXInput.setAttribute("max", "100")
      this.translateXInput.setAttribute("value", "0")
      this.translateXInput.setAttribute("step", "5")
      this.translateContainer.append(this.translateXInput)

    this.translateYInput = document.createElement("input")
      this.translateYInput.classList.add("transform-y-input")
      this.translateYInput.setAttribute("type", "number")
      this.translateYInput.setAttribute("placeholder", "y")
      this.translateYInput.setAttribute("min", "-100")
      this.translateYInput.setAttribute("max", "100")
      this.translateYInput.setAttribute("value", "0")
      this.translateYInput.setAttribute("step", "5")
      this.translateContainer.append(this.translateYInput)

    this.scaleInput.addEventListener("input", (e) => this.handleScale(e));
    this.translateXInput.addEventListener("input", (e) => this.handleTransformX(e));
    this.translateYInput.addEventListener("input", (e) => this.handleTransformY(e));

    document.querySelector("#play-button").addEventListener("click", () => this.toggleSettings())
    
    this.videoContainer.appendChild(this.video)
    this.videoContainer.appendChild(this.videoSettings)
    videoList.appendChild(this.videoContainer)
    videoList.append(document.querySelector(".video-drop-zone"))
  }

  handleTrimInput(e, direction) {
    let val = parseFloat(e.target.value)
    let min = parseFloat(e.target.min)
    let max = parseFloat(e.target.max)
    let percent

    switch(direction) {
      case "left":
        val = Math.min(val, parseFloat(this.inputRight.value) - 1);
        percent = ((val - min) / (max - min)) * 100;
        this.hiddenSliderThumbLeft.style.left = `${percent}%`;
        this.hiddenSliderRange.style.left = `${percent}%`
      break;
      case "right":
        val = Math.max(val, parseFloat(this.inputLeft.value) + 1);
        percent = ((val - min) / (max - min)) * 100;
        this.hiddenSliderThumbRight.style.right = `${100 - percent}%`
        this.hiddenSliderRange.style.right = `${100 - percent}%`
      break;
    }
  }

  handleScale(e) {
    this.valScale = e.target.value
    return this.video.style.transform = `scale(${this.valScale}) translate(${this.valX}px , ${this.valY}px)`
  }

  handleTransformX(e) {
    this.valX = e.target.value
    return this.video.style.transform = `scale(${this.valScale}) translate(${this.valX}px , ${this.valY}px)`
  }

  handleTransformY(e) {
    this.valY= e.target.value
    return this.video.style.transform = `scale(${this.valScale}) translate(${this.valX}px , ${this.valY}px)`
  }

  toggleSettings() {
    if (this.settingsOpen) {
      console.log(this.settingsOpen)
      this.settingsOpen = false
      this.videoSettings.classList.remove("active")
    } else {
      this.settingsOpen = true
      this.videoSettings.classList.add("active")
    }
  }

  play() {
    /// write the custom play logic here, setting the start, end, duration, and rate
    this.video.play()
  }
  pause() {
    this.video.pause()
  }

}

function slugify(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '')             // Trim - from start of text
  .replace(/-+$/, '');            // Trim - from end of text
}

function makeID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}