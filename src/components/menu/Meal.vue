<template>
  <b-form-select
    :value="state.item ? new String(state.item.meal_id) : null"
    allow-empty
    :items="items"
    item-key="id"
    item-value="name"
    @change="persist"
  />
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api'
import { find } from 'lodash'

export default {
  name: 'menu-meal',
  props: {
    plan: Object,
    day: Number,
    course: Number,
    items: Array,
    menu: Array,
  },
  setup(props, { emit }) {
    const { plan, day, course, menu } = toRefs(props)

    const state = reactive({
      day: day.value,
      course: course.value,
      item: computed(() => {
        return find(menu.value, { day: day.value, course: course.value })
      }),
    })

    const create = (meal_id) => {
      emit('create', {
        meal: parseInt(meal_id),
        plan: plan.value.id,
        day: state.day,
        course: state.course,
      })
    }

    const update = (meal_id) => {
      emit('update', {
        id: state.item.id,
        params: {
          meal: parseInt(meal_id),
          plan: state.item.plan_id,
          day: state.day,
          course: state.course,
        },
      })
    }

    const remove = () => {
      emit('remove', state.item.id)
    }

    const persist = (meal_id) => {
      if (state.item === undefined) {
        return create(meal_id)
      }

      if (meal_id === '') {
        return remove()
      }

      update(meal_id)
    }

    return { state, persist }
  },
}
</script>
