<template>
  <b-app id="app">
    <heading />

    <b-container size="m" v-if="state.isAuthenticated">
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

    <router-view v-if="state.isAuthenticated" />

    <b-container size="s" v-if="!state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <auth-login @logged-in="session" />
    </b-container>
  </b-app>
</template>

<script>
import Heading from './components/Heading'
import AuthLogin from './components/auth/Login'
import useAuth from '@/composables/useAuth'

export default {
  name: 'app',
  components: {
    Heading,
    AuthLogin,
  },
  head: {
    title: 'Home',
    titleTemplate: '%s - Menu',
  },
  setup(props, { emit }) {
    const { state, check, session, logout } = useAuth(emit)
    check()

    return { state, session, logout }
  },
  methods: {
    onLoggedOut() {
      this.session()
    },
  },
}
</script>
