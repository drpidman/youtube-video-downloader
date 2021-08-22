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
    this.once("audio:downloadCommand", (await this.DownloadAudioCommand(url, dest)));
    this.removeListener("audio:downloadCommand", (await this.DownloadAudioCommand));
    this.emit("audio:downloadCommand", url, dest);
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

    ffmpeg(stream)
      .audioBitrate(128)
      .save(title)
      .once(
        "start",
        new Notification(`Download Started`, { body: `Saving in ${title}` })
      )
      .once(
        "end",
        new Notification(`Download Ended`, { body: `Saved in ${title}` })
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
}

module.exports = {
  DownloadService,
};
