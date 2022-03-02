export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.closeBtn = this.overlay.querySelector('.close');
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
        });

        console.log(this.player);
        this.overlay.style.display = 'flex';
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    // console.log(path);
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.closeBtn.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    init() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}