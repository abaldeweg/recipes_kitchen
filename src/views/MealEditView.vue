<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('editMeal') }}</h1>
    </b-container>

    <b-container size="m" v-if="meal.state.meal">
      <b-form @submit.prevent="meal.update">
        <!-- name -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="name">{{ $t('name') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input id="name" v-model="meal.state.meal.name" />
          </b-form-item>
        </b-form-group>

        <!-- description -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="description">
              {{ $t('description') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-textarea
              id="description"
              v-model="meal.state.meal.description"
            ></b-form-textarea>
          </b-form-item>
        </b-form-group>

        <!-- price -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="price">{{ $t('price') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="price"
              step="0.10"
              pattern="^\d+(\.|,)?\d{0,2}$"
              v-model="meal.state.meal.price"
            />
          </b-form-item>
        </b-form-group>

        <!-- buttons -->
        <b-form-group buttons>
          <b-form-item>
            <b-button design="primary" v-if="!meal.state.isUpdating">
              {{ $t('save') }}
            </b-button>
            <b-button type="button" design="outline" v-else>
              <b-spinner size="s" />
            </b-button>
          </b-form-item>
        </b-form-group>
      </b-form>
    </b-container>

    <b-container size="m" v-else>
      <b-spinner size="l" />
    </b-container>

    <b-toast type="success" ref="toastSuccess">
      {{ $t('updateSuccess') }}
    </b-toast>
    <b-toast type="error" ref="toastError">
      {{ $t('updateError') }}
    </b-toast>
  </article>
</template>

<script>
import useMeal from '@/composables/useMeal'
import { onMounted, ref, watch } from '@vue/composition-api'

export default {
  name: 'meal-edit-view',
  head: {
    title: 'Edit Meal',
  },
  props: {
    id: Number,
  },
  setup(props) {
    const toastSuccess = ref(null)
    const toastError = ref(null)
    const meal = useMeal()

    onMounted(() => {
      meal.show(props.id)
    })

    watch(
      () => meal.state.hasUpdateSuccess,
      () => {
        if (meal.state.hasUpdateSuccess === true) {
          toastSuccess.value.show()
          meal.state.hasUpdateSuccess = false
        }
      }
    )

    watch(
      () => meal.state.hasUpdateError,
      () => {
        if (meal.state.hasUpdateError === true) {
          toastError.value.show()
          meal.state.hasUpdateError = false
        }
      }
    )

    return { meal, toastSuccess, toastError }
  },
}
</script>
