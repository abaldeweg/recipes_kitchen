<template>
  <article>
    <b-container size="m">
      <router-link :to="{ name: 'meal.create' }" :style="{ float: 'right' }">
        {{ $t('createMeal') }}
      </router-link>

      <h1>{{ $t('meals') }}</h1>
    </b-container>

    <b-container size="m" v-if="meal.state.meals">
      <b-table>
        <table :aria-label="$t('meals')">
          <thead>
            <tr>
              <th scope="col">{{ $t('meal') }}</th>
              <th scope="col">{{ $t('description') }}</th>
              <th scope="col">{{ $t('price') }}</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in meal.state.meals" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.price }}</td>
              <td>
                <router-link
                  :to="{ name: 'meal.edit', params: { id: item.id } }"
                >
                  {{ $t('edit') }}
                </router-link>
              </td>
              <td>
                <a href="#" @click="meal.hide(item)">{{ $t('delete') }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-table>
    </b-container>

    <b-container size="m" v-else>
      <b-spinner size="l" />
    </b-container>
  </article>
</template>

<script>
import useMeal from '@/composables/useMeal'
import { onMounted } from '@vue/composition-api'

export default {
  name: 'meal-view',
  head: {
    title: 'Meals',
  },
  setup() {
    const meal = useMeal()

    onMounted(meal.list)

    return { meal }
  },
}
</script>
