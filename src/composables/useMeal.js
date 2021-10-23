import { reactive } from '@vue/composition-api'
import api from '@/api/meal'

export default function useMeal() {
  const state = reactive({
    meals: null,
    meal: null,
    isCreating: false,
    isUpdating: false,
    hasUpdateSuccess: false,
    hasUpdateError: false,
    hasCreateSuccess: false,
    hasCreateError: false,
  })

  const list = () => {
    api.list().then((response) => {
      state.meals = response.data
    })
  }

  const show = (meal) => {
    api.show(meal).then((response) => {
      state.meal = response.data
    })
  }

  const create = () => {
    state.isCreating = true
    api
      .create({
        name: state.meal.name,
        description: state.meal.description,
        price: state.meal.price,
        deleted: state.meal.deleted,
      })
      .then(() => {
        state.hasCreateSuccess = true
      })
      .catch(() => {
        state.hasCreateError = true
      })
      .finally(() => {
        state.isCreating = false

        state.meal = {
          name: null,
          description: null,
          price: 0.0,
          deleted: false,
        }
      })
  }

  const update = () => {
    state.isUpdating = true
    api
      .update(state.meal.id, {
        name: state.meal.name,
        description: state.meal.description,
        price: state.meal.price,
        deleted: state.meal.deleted,
      })
      .then(() => {
        state.hasUpdateSuccess = true
      })
      .catch(() => {
        state.hasUpdateError = true
      })
      .finally(() => {
        state.isUpdating = false
      })
  }

  const hide = (meal) => {
    api
      .update(meal.id, {
        name: meal.name,
        description: meal.description,
        price: meal.price,
        deleted: true,
      })
      .then(() => {
        list()
      })
  }

  return {
    state,
    list,
    show,
    create,
    update,
    hide,
  }
}
