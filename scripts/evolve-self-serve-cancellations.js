/* Evolve Self-Serve Cancellations - Video Interaction Logic */

// Video auto-play with loop count functionality
const wrappers = document.querySelectorAll('.video-wrapper');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const wrapper = entry.target;
        const video = wrapper.querySelector('video');
        const overlay = wrapper.querySelector('.video-overlay');
        const loopsToPlay = Number(wrapper.getAttribute('data-loop-count') || 3);
        if (!video) return;

        if (entry.isIntersecting) {
            if (video.dataset.started === 'true') return;
            video.currentTime = 0;
            video.loop = false;
            video.muted = true;
            video.playbackRate = 1.0;
            video.dataset.loopCounter = '0';
            video.dataset.started = 'true';
            video.play().catch(() => {});

            const onEnded = () => {
                const n = Number(video.dataset.loopCounter || '0') + 1;
                video.dataset.loopCounter = String(n);
                if (n < loopsToPlay) {
                    video.currentTime = 0;
                    video.play().catch(() => {});
                } else {
                    video.pause();
                    overlay && overlay.classList.add('is-visible');
                    video.removeEventListener('ended', onEnded);
                }
            };
            video.addEventListener('ended', onEnded);
        }
    });
}, { threshold: 0.5 });

wrappers.forEach(w => observer.observe(w));

// Manual play button functionality
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const overlay = wrapper.querySelector('.video-overlay');
    const playBtn = wrapper.querySelector('.video-play-btn');
    if (!video || !overlay || !playBtn) return;

    playBtn.addEventListener('click', () => {
        overlay.classList.remove('is-visible');
        video.play().catch(() => {});
    });
});
