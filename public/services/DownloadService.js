const { EventEmitter } = require("events");
const { remote } = require("electron");

const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const ytdl = require("ytdl-core");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class DownloadService extends EventEmitter {
  constructor() {
    super();
  }
  /**
   *
   * @param {*} url
   * @param {*} dest
   */
  DownloadAudioEvent = async (url, dest) => {
    // TEST LINE =====================
    this.once("audio:downloadCommand", function(url, dest) {
      this.DownloadAudioCommand(url, dest)
    });
    this.removeListener("audio:downloadCommand", this.DownloadAudioCommand);
    this.emit("audio:downloadCommand", url, dest);
    // TEST LINE =====================
  };

  /**
   *
   * @param {*} url
   * @param {*} dest
   */
  DownloadAudioCommand = async (url, dest) => {
    const videoInfo = await ytdl.getInfo(url);
    let videoDetails = {
      title: this.removeInvalidsChrts(
        videoInfo.player_response.videoDetails.title
      ),
      url: videoInfo.videoDetails.video_url,
    };

    let title = dest + path.join(`/${videoDetails.title}.mp3`);

    const stream = ytdl(url, {
      quality: "highestaudio",
    });

    // FIX SPAWN ERROR ENOENT
    ffmpeg(stream)
      .audioBitrate(128)
      .save(title)
      .on("progress", (progress) => {
        this.emit('audio:onProgress', progress);
      })
      .on(
        "end",
        () => {
          new Notification(`Download Ended`, { body: `Saved in ${title}` })
        }
      );
  };

  /**
   *
   * @param {*} name
   */
  removeInvalidsChrts(name) {
    return name
      .replace(/[^\x00-\x7F]/gim, "")
      .replace(/\"/gim, "")
      .replace(/[\']?[\!]?[\|]?[\?]?/gim, "");
  }


  getFfmpegPath() {
    return ffmpegInstaller.path;
  }
}

module.exports = {
  DownloadService,
};
