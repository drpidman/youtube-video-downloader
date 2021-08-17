import { EventEmitter } from 'events';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegintaller from '@ffmpeg-installer/ffmpeg';
import * as path from 'path';


ffmpeg.setFfmpegPath(ffmpegintaller.path);

export default class DMusicService extends EventEmitter {
  constructor() {
    super();
  }

  public async onDownloadClick(url: string, dest: string): Promise<void> {
    this.emit("OnDownloadAudioClick", url, dest);
    this.downloadFile();
  }

  public async downloadFile() {
    
    this.on("OnDownloadAudioClick", async (url, dest) => {
      console.log(url, dest);
      const videoInfo = await ytdl.getInfo(url);
      const videoProperties = {
        title: this.removeInvalidCharts(videoInfo.player_response.videoDetails.title),
        url: (await videoInfo.videoDetails.video_url)
      }
      let title = dest + (path.join(`/${videoProperties.title}.mp3`));
   
      const stream = ytdl(url, {
        quality: 'highestaudio'
      });

      ffmpeg(stream)
      .audioBitrate(128)
      .save(title)
      .on('start', () => {
        this.emit('OnDownloadAudioStart', `Download started`)
      })
      .on('end', () => {
        this.emit('OnDownloadAudioEnd', `Download saved in ${title}`);
      })
    })
  }

  public removeInvalidCharts(str:string) {
    return str
    .replace(/[^\x00-\x7F]/gim, '')
    .replace(/\"/gim, '')
    .replace(/[\']?[\!]?[\|]?[\?]?/gim, '')
  }
}