<template>
  <b-app>
    <b-masthead>
      <b-masthead-item type="center">
        <router-link :to="{ name: 'index' }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 200 200"
            class="logo"
          >
            <path
              d="M 100 7.8359375 A 92.164001 92.163849 0 0 0 7.8359375 100 A 92.164001 92.163849 0 0 0 100 192.16406 A 92.164001 92.163849 0 0 0 192.16406 100 A 92.164001 92.163849 0 0 0 100 7.8359375 z M 77.582031 44.291016 L 148 44.291016 L 148 74.708984 L 77.582031 74.708984 L 77.582031 44.291016 z M 54.5 44.701172 A 14.798226 14.798226 0 0 1 69.298828 59.5 A 14.798226 14.798226 0 0 1 54.5 74.298828 A 14.798226 14.798226 0 0 1 39.701172 59.5 A 14.798226 14.798226 0 0 1 54.5 44.701172 z M 78.791016 84.791016 L 149.20898 84.791016 L 149.20898 115.20898 L 78.791016 115.20898 L 78.791016 84.791016 z M 54.5 85.201172 A 14.798226 14.798226 0 0 1 69.298828 100 A 14.798226 14.798226 0 0 1 54.5 114.79883 A 14.798226 14.798226 0 0 1 39.701172 100 A 14.798226 14.798226 0 0 1 54.5 85.201172 z M 77.582031 125.29102 L 148 125.29102 L 148 155.70898 L 77.582031 155.70898 L 77.582031 125.29102 z M 54.5 125.70117 A 14.798226 14.798226 0 0 1 69.298828 140.5 A 14.798226 14.798226 0 0 1 54.5 155.29883 A 14.798226 14.798226 0 0 1 39.701172 140.5 A 14.798226 14.798226 0 0 1 54.5 125.70117 z"
            />
          </svg>
        </router-link>
      </b-masthead-item>
    </b-masthead>

    <b-container size="m" v-if="auth.state.isAuthenticated">
      <b-tabs>
        <b-tabs-link>
          <router-link :to="{ name: 'menu' }">{{ $t('menu') }}</router-link>
        </b-tabs-link>
        <b-tabs-link>
          <router-link :to="{ name: 'meal' }">{{ $t('meals') }}</router-link>
        </b-tabs-link>
        <b-tabs-link>
          <router-link :to="{ name: 'profile' }">
            {{ $t('profile') }}
          </router-link>
        </b-tabs-link>
        <b-tabs-link>
          <a href="/logout" @click.prevent="logout">
            {{ $t('logout') }}
          </a>
        </b-tabs-link>
      </b-tabs>
    </b-container>

    <slot />
  </b-app>
</template>

<script>
export default {
  name: 'layout',
  props: {
    auth: {
      type: Object,
    },
  },
}
</script>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
