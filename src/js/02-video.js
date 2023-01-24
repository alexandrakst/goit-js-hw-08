import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    const time = data.seconds;
    console.log(time);

    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME, time);
  }, 1000)
);

setCurrentTime();
function setCurrentTime() {
  if (!localStorage.getItem(VIDEOPLAYER_CURRENT_TIME)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(VIDEOPLAYER_CURRENT_TIME));
}
