const { EventEmitter } = require("events");
const { remote } = require("electron");

const ffmpeg = require("fluent-ffmpeg");

// fix path error .asar
let ffmpegPath = require("@ffmpeg-installer/ffmpeg").path.replace(
  "app.asar",
  "app.asar.unpacked"
);

const path = require("path");
const ytdl = require("ytdl-core");

// set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

class DownloadService extends EventEmitter {
  constructor() {
    super();
  }
  /**
   *
   * @param {*} url music url
   * @param {*} dest folder dest
   */
  DownloadAudioEvent = async (url, dest) => {
    // TEST LINE =====================
    this.once("audio:downloadCommand", function (url, dest) {
      this.DownloadAudioCommand(url, dest);
    });
    this.removeListener("audio:downloadCommand", this.DownloadAudioCommand);
    this.emit("audio:downloadCommand", url, dest);
    // TEST LINE =====================
  };

  /**
   *
   * @param {*} url music url
   * @param {*} dest folder dest
   */
  DownloadAudioCommand = async (url, dest) => {
    const MusicInfo = await ytdl.getBasicInfo(url);
    let MusicDetails = {
      title: this.removeInvalidsChrts(
        MusicInfo.player_response.videoDetails.title
      ),
      url: MusicInfo.videoDetails.video_url,
    };

    let title = dest + path.join(`/${MusicDetails.title}.mp3`);

    try {
      const stream = ytdl(url, {
        quality: "highestaudio",
      });

      // FIX SPAWN ERROR ENOENT
      // start
      await ffmpeg(stream)
        .audioBitrate(128)
        .save(title)
        .on("progress", (progress) => {
          console.log(progress);
          this.emit("audio:onProgress", progress);
        })
        .on("end", () => {
          new Notification(`Download Ended`, { body: `Saved in ${title}` });
          this.emit("audio:onDownloadEnded");
        });
    } catch (e) {
      this.emit("audio:onError", e);
    }
  };

  /**
   *
   * @param {*} url video url
   * @param {*} dest dest folder
   */
  DownloadVideoEvent = (url, dest) => {
    this.once("video:onDownloadCommand", function (url, dest) {
      // private function
      this.DownloadVideoCommand(url, dest);
    });
    this.removeListener("video:onDownloadCommand", this.DownloadVideoCommand);
    this.emit("video:onDownloadCommand", url, dest);
  };

  // listener
  DownloadVideoCommand = async (url, dest) => {
    const VideoInfo = await ytdl.getBasicInfo(url);
    let videoDetails = {
      title: this.removeInvalidsChrts(
        VideoInfo.player_response.videoDetails.title
      ),
      url: VideoInfo.videoDetails.video_url,
    };

    let title = dest + path.join(`/${videoDetails.title}.mp4`);

    const stream = ytdl(url, {
      format: "mp4",
      quality: "highestaudio",
    });

    await ffmpeg(stream)
      .audioBitrate(128)
      .save(title)
      .on("progress", (progress) => {
        this.emit("video:onProgress", progress);
      })
      .on("end", () => {
        new Notification("Download Ended", {
          body: `Download Ended, saved in ${title}`,
        });
        this.emit("video:onDownloadEnded");
      });
  };

  /**
   *
   * @param {*} name url
   */
  removeInvalidsChrts(name) {
    return name
      .replace(/[^\x00-\x7F]/gim, "")
      .replace(/\"/gim, "")
      .replace(/[\']?[\!]?[\|]?[\?]?/gim, "");
  }
}

module.exports = {
  DownloadService,
};
