/* eslint-env browser */

import Receiver from './receiver.js';
import ReceiverChat from './receiver-chat.js';
import { $, $$ } from './fake-jquery.js';

import 'https://cdn.pika.dev/audio-visualiser/v1';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

let receiver;
let chat;

function getStation() {
  const params = new URLSearchParams(document.location.search);

  return params.get('id');
}

function renderMetadata(metadata) {
  $('#title').innerHTML = metadata.title;
  $('#artist').innerHTML = metadata.artist;

  if (metadata.cover) {
    $('#cover').src = metadata.cover;
  }

  const backgrounds = $$('.background');

  for (let i = 0; i < backgrounds.length; i++) {
    const bg = backgrounds[i];

    bg.style.backgroundImage = 'url("' + metadata.cover + '")';
  }

  // $('#station-name').innerHTML = 'Station: ' + getStation();
}

function registerChatHandler() {
  $('#send-message').addEventListener('click', () => {
    chat.sendMessage($('#message').value);
  });
}

window.onload = function () {
  const station = getStation();

  const audioElement = $('audio');
  const audioVisualiser = $('audio-visualiser');

  const playPlay = $('#playplay');

  playPlay.addEventListener('click', () => {
    audioElement.play();
  });

  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();

  analyser.fftSize = 256;

  audioVisualiser.analyser = analyser;

  if (station) {
    receiver = new Receiver(station);

    document.addEventListener('receiver:new-song', event => {
      if (event instanceof CustomEvent) {
        const { stream, mediaDescription } = receiver;

        audioElement.srcObject = stream;

        const source = audioContext.createMediaStreamSource(stream);

        source.connect(analyser);

        const dest = audioContext.createMediaStreamDestination();

        analyser.connect(dest);

        renderMetadata(mediaDescription);

        audioVisualiser.start();
      }
    });

    audioElement.addEventListener('play', () => audioVisualiser.start());
    audioElement.addEventListener('pause', () => audioVisualiser.stop());

    const chatName = this.prompt('What is your name?');

    chat = new ReceiverChat(station, chatName);

    registerChatHandler();

    chat.onMessage(data => {
      const message = document.createElement('div');

      message.classList.add('message');
      const fromSpan = document.createElement('span');

      fromSpan.innerHTML = data.from;
      fromSpan.classList.add('from');

      message.appendChild(fromSpan);

      const paragraph = document.createElement('p');

      paragraph.innerHTML = data.message;
      message.appendChild(paragraph);
      $('#messages').appendChild(message);
    });
  } else {
    console.error('No station entered');
  }
};
