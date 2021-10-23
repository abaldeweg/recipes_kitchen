<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('profile') }}</h1>
    </b-container>

    <b-container size="m">
      <auth-password />
    </b-container>
  </article>
</template>

<script>
import AuthPassword from './../components/auth/Password'

export default {
  name: 'profile-view',
  components: {
    AuthPassword,
  },
  head: {
    title: 'Profile',
  },
}
</script>
