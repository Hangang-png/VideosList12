async function loadSongs() {
  const res = await fetch('/songs.json');
  const songs = await res.json();

  const songList = document.getElementById('song-list');
  songList.innerHTML = '';

  songs.forEach((song) => {
    const div = document.createElement('div');
    div.className = 'song';

    if (song.type === 'audio') {
      div.innerHTML = `
        <p>${song.title}</p>
        <audio controls loop src="${song.url}"></audio>
      `;
    } else if (song.type === 'video') {
      div.innerHTML = `
        <h3>🎬 ${song.title}</h3>
        <div class="video">
          <video controls>
            <source src="${song.url}" type="video/mp4">
            您的浏览器不支持 video 标签。
          </video>
        </div>
      `;
    }

    songList.appendChild(div);
  });

  // 防止多个音频同时播放
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.addEventListener('play', () => {
      audios.forEach(other => {
        if (other !== audio) other.pause();
      });
    });
  });

  // ✅ 防止多个视频同时播放
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(other => {
        if (other !== video) other.pause();
      });
    });
  });
}

// 确保在 HTML 加载完后执行
window.addEventListener('DOMContentLoaded', loadSongs);
