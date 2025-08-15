import titles from './titles.js';

const app = new Vue({
  el: '.container-fluid',
  data: {
    y: null,
    res: [],
    type: 'AD',
    tc: "turnstile"
  },
  methods: {
    query() {
      this.res = [];
      let index = -1;
      switch (this.type) {
        case 'BC':
          index = 0;
          break;
        case 'AD':
          index = 1;
          break;
      }
      for (let i = 0; i < titles[index].length; i++) {
        if (titles[index][i].expYears === Number(this.y)) {
          this.res = titles[index][i].data;
        }
      }
    },
    changeCaptcha() {
      const tcel = document.querySelector('.turnstile');
      if(this.tc === "turnstile") {
        tcel.classList.replace(this.tc, "h-captcha");
        hcaptcha.render('.h-captcha', {
          sitekey: 'a276442c-f5fa-462a-92a0-2c7897ace8a6',
          callback(token) {
            modalInstance.hide();
          }
        });
      } else {
        tcel.classList.replace(this.tc, "turnstile");
        const turnstileWidget = turnstile.render('.turnstile', {
          sitekey: '0x4AAAAAABrvPEVbxJhK_XYd',
          callback(token) {
              modalInstance.hide();
          }
        });
      }
    },
    deleteAll() {
      this.res = [];
      this.y = null;
      this.type = 'AD';
    },
    formatOtitle(arr) {
      return '亦作' + arr.join('、');
    },
    initPopovers() {
      const popoverTriggerList = [].slice.call(
        this.$el.querySelectorAll('[data-bs-toggle="popover"]')
      );
      popoverTriggerList.map((triggerEl) => {
        const popover = new bootstrap.Popover(triggerEl, {
          customClass: 'kai'
        });
        document.addEventListener('click', (e) => {
          const isClickInside = triggerEl.contains(e.target);
          const isClickInPopover =
            popover._element && popover._element.contains(e.target);
          if (!isClickInside && !isClickInPopover) {
            popover.hide();
          }
        });
        return popover;
      });
    }
  },
  computed: {
    group() {
      const result = [];
      for (let i = 0; i < this.res.length; i += 2) {
        result.push(this.res.slice(i, i + 2));
      }
      return result;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initPopovers();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.initPopovers();
    });
  }
});