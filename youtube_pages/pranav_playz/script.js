// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const savedTheme = localStorage.getItem('theme');
  
    // Set initial theme
    if (savedTheme === 'light-theme') {
      document.body.classList.add('light-theme');
      themeToggleCheckbox.checked = true;
    }
  
    // Toggle theme on switch change
    themeToggleCheckbox.addEventListener('change', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light-theme' : '');
    });
  });

  // Fetch YouTube Data
  const apiKey = 'AIzaSyAnHNWiTZtqAjHzuSh0KxTkGNHEPULDxBw';  // Replace with your API Key
  const channelId = 'UCsRxpdzBKX5bYS03lrjQZOw';  // Replace with your YouTube Channel ID

  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const stats = data.items[0].statistics;
      const subscribers = stats.subscriberCount;
      const views = stats.viewCount;

      document.getElementById('subscriberCount').textContent = `Subscribers: ${subscribers}`;
      document.getElementById('totalViews').textContent = `Total Views: ${views}`;
    })
    .catch(error => console.log('Error fetching YouTube data:', error));

  // Pop-Up Navigation Bar
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.classList.remove('visible');
    } else {
      // Scrolling up
      navbar.classList.add('visible');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
  fetch('videos.json')
  .then(response => response.json())
  .then(data => {
    const videoGrid = document.getElementById('videoGrid');

    data.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.classList.add('video-card');

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${video.videoId}`;
      iframe.frameBorder = "0";
      iframe.allowFullscreen = true;

      const title = document.createElement('h3');
      title.textContent = video.title;

      videoCard.appendChild(iframe);
      videoCard.appendChild(title);
      videoGrid.appendChild(videoCard);
    });
  })
  .catch(error => console.error('Error loading the JSON file:', error));
