<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('menu') }}</h1>
    </b-container>

    <b-container size="m">
      <b-form>
        <b-form-group>
          <b-form-item>
            <b-form-label for="year">
              {{ $t('year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="number" id="year" v-model="menu.state.year" />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="week">{{ $t('week') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="number" id="week" v-model="menu.state.week" />
          </b-form-item>
        </b-form-group>
      </b-form>
    </b-container>

    <b-container size="m">
      <b-table v-if="meal.state.meals && meal.state.meals.length >= 1">
        <table :aria-label="$t('menu')">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">{{ $t('salad') }}</th>
              <th scope="col">{{ $t('vegetarian') }}</th>
              <th scope="col">{{ $t('mainCourse') }}</th>
              <th scope="col">{{ $t('dessert') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(day, index) in [
                $t('monday'),
                $t('tuesday'),
                $t('wednesday'),
                $t('thursday'),
                $t('friday'),
              ]"
              :key="index"
            >
              <th scope="row">{{ day }}</th>
              <td v-for="course in 4" :key="course">
                <menu-meal
                  :plan="menu.state.plan"
                  :day="index"
                  :course="course"
                  :items="meal.state.meals"
                  :menu="menu.state.menu"
                  @update="menu.update"
                  @create="menu.create"
                  @remove="menu.remove"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </b-table>
    </b-container>

    <b-container size="m">
      {{ $t('download') }}: <a :href="state.pdf">PDF</a> -
      <a :href="state.json">JSON</a>
    </b-container>
  </article>
</template>

<script>
import useMenu from '@/composables/useMenu'
import useMeal from '@/composables/useMeal'
import { computed, onMounted, reactive } from '@vue/composition-api'
import MenuMeal from '@/components/menu/Meal'

export default {
  name: 'menu-view',
  head: {
    title: 'Menu',
  },
  components: {
    MenuMeal,
  },
  setup() {
    const menu = useMenu()
    const meal = useMeal()

    const state = reactive({
      pdf: computed(() => {
        return (
          process.env.VUE_APP_API +
          '/export/' +
          menu.state.year +
          '-' +
          menu.state.week +
          '.pdf'
        )
      }),
      json: computed(() => {
        return (
          process.env.VUE_APP_API +
          '/export/' +
          menu.state.year +
          '-' +
          menu.state.week +
          '.json'
        )
      }),
    })

    onMounted(() => {
      meal.list()
    })

    return { state, menu, meal }
  },
}
</script>

<style scoped>
thead th {
  width: 20%;
}
</style>
