<template>
  <div>
    <iframe
      id="MainPopupIframe"
      :src="object.SourceLink"
      allow="camera;microphone"
      class="iframe-window"
    >
    </iframe>
    <div id="secondMask">
      <div id="zee-splash" :style="backgroundStyle">
        <div class="zee-splash-large-flex-space"></div>
        <div class="zee-logo">
          <img
            v-if="!object.NotUseLogo"
            style="width: 100%; height: 100%; position: absolute"
            :src="object.LogoUrl"
            width="100"
            height="100"
          />
        </div>
        <div class="zee-splash-small-flex-space"></div>
        <div id="lunch">
          <button id="zee-launch-button" :style="buttonStyle">
            <span id="zee-launch-button-text" :style="{ color: object.ButtonColor }">{{ object.ButtonText2 }}</span
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 12">
              <path
                :fill="object.ButtonColor"
                fill-rule="evenodd"
                d="M.166 0L10.56 6 .166 12z"
              ></path>
            </svg>
          </button>
        </div>

        <div id="zee-loading">
          <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
          </div>
        </div>
        <div class="zee-splash-small-flex-space"></div>
        <div id="zee-loading-helper">
          <div id="zee-loading-helper-1">
            <div
              class="zee-loading-helper-title"
              id="zee-loading-helper-1-title"
            >
              Loading...
            </div>
            <span id="zee-loading-helper-1-body"
              >It may take a few moments to load the experience over your
              connection.</span
            >
          </div>
          <div id="zee-loading-helper-2">
            <div
              class="zee-loading-helper-title"
              id="zee-loading-helper-2-title"
            >
              Still Loading...
            </div>
            <span id="zee-loading-helper-2-body"
              >Please check you have a good Wi-Fi or mobile data
              connection.</span
            >
          </div>
        </div>
        <div class="zee-splash-small-flex-space"></div>
        <div id="zee-cookie-notice">
          <span id="zee-cookie-title">Cookies</span>Once you tap Launch, we’ll
          use cookies to enable operation of the site, and to measure usage and
          engagement.
        </div>
        <div id="zee-privacy">
          <a
            href="https://www.zappar.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            >Privacy Policy</a
          >
          |
          <a id="zee-launch-button-only-essential"
            >Launch w/o Analytics Cookies</a
          >
        </div>
      </div>
    </div>
    <div id="firstMask">
      <div id="zee-splash" :style="backgroundStyle">
        <div class="zee-splash-large-flex-space"></div>
        <div class="zee-logo">
          <img
            v-if="!object.NotUseLogo"
            style="width: 100%; height: 100%; position: absolute"
            :src="object.LogoUrl"
            width="100"
            height="100"
          />
        </div>
        <div class="zee-splash-small-flex-space"></div>
        <button id="zee-launch-button" :style="buttonStyle">
          <span id="zee-launch-button-text" :style="{ color: object.ButtonColor }">{{ object.ButtonText1 }}</span
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 12">
            <path
              :fill="object.ButtonColor"
              fill-rule="evenodd"
              d="M.166 0L10.56 6 .166 12z"
            ></path>
          </svg>
        </button>
        <div id="zee-loading">
          <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
          </div>
        </div>
        <div class="zee-splash-small-flex-space"></div>
        <div id="zee-loading-helper">
          <div id="zee-loading-helper-1">
            <div
              class="zee-loading-helper-title"
              id="zee-loading-helper-1-title"
            >
              Loading...
            </div>
            <span id="zee-loading-helper-1-body"
              >It may take a few moments to load the experience over your
              connection.</span
            >
          </div>
          <div id="zee-loading-helper-2">
            <div
              class="zee-loading-helper-title"
              id="zee-loading-helper-2-title"
            >
              Still Loading...
            </div>
            <span id="zee-loading-helper-2-body"
              >Please check you have a good Wi-Fi or mobile data
              connection.</span
            >
          </div>
        </div>
        <div class="zee-splash-small-flex-space"></div>
        <div id="zee-cookie-notice">
          <span id="zee-cookie-title">Cookies</span>Once you tap Launch, we’ll
          use cookies to enable operation of the site, and to measure usage and
          engagement.
        </div>
        <div id="zee-privacy">
          <a
            href="https://www.zappar.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            >Privacy Policy</a
          >
          |
          <a id="zee-launch-button-only-essential"
            >Launch w/o Analytics Cookies</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'ar',
  async asyncData({ app, route }) {
    const data = await app.$fire.database
      .ref(`/Orders/${route.params.id}`)
      .once('value')
      .then(function (snapshot) {
        console.log('ORDER:', snapshot.val())
        return { key: route.params.id, ...snapshot.val() }
      })
    return { object: data }
  },
  computed: {
    backgroundStyle() {
      if (this.object.BackgroundType === 'color') {
        return {
          'background-color': this.object.Color,
        }
      } else return {
          'background-image': `url(${this.object.BackgroundFileUrl})`
      }
    },
    buttonStyle(){
      return {
        borderColor: this.object.ButtonColor,
        color: this.object.ButtonColor
      }
    }
  },
  created() {
    if (!process.server) {
      var isFinished = false
      var secondMask = document.getElementById('secondMask')
      var element = document.getElementById('firstMask')
      secondMask.style.opacity = '0'
      var lunch = document.getElementById('lunch')
      lunch.addEventListener('click', function () {
        isFinished = true
        secondMask.style.opacity = '0'
      })
      var ifr = document.getElementById('MainPopupIframe')
      var x = 0
      var video = document.getElementById('video')
      ifr.onload = function () {
        window.setInterval(function () {
          var focus = document.activeElement
          if (document.activeElement == ifr) {
            if (isFinished) {
              console.log('erererere')
            } else {
              element.style.opacity = '0'
              console.log('dsdsdsdsdsdsd')
              secondMask.style.opacity = '100'
              lunch.style['pointer-events'] = 'auto'
            }
          }
        }, 1000)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('~/assets/style/zapper-mask.scss');

#firstMask {
//   opacity: 0.3;
}
</style>
