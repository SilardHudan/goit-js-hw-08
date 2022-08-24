import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  let seconds = localStorage.getItem('videoplayer-current-time');
  seconds = parseFloat(seconds);
  if (!seconds) {
    seconds = 0;
  }
  player
    .setCurrentTime(seconds)
    .then(function (seconds) {
      console.log('Time has set to:' + seconds);
      player.off('play');
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.error(
            "the time was less than 0 or greater than the video's duration"
          );
          break;

        default:
          console.error('Vimeo player:error occurred', error);
          break;
      }
    });
});

function onTimeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}
player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

