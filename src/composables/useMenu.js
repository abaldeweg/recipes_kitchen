import { onMounted, reactive, watch } from '@vue/composition-api'
import menuApi from '@/api/menu'
import planApi from '@/api/plan'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export default function useMenu() {
  const state = reactive({
    menu: null,
    plan: null,
    year: dayjs().year(),
    week: dayjs().isoWeek(),
  })

  const fetchPlan = () => {
    state.plan = null
    state.menu = null
    planApi
      .show(state.year, state.week)
      .then((response) => {
        state.plan = response.data
        fetchMenu()
      })
      .catch(() => {
        savePlan()
      })
  }

  const fetchMenu = () => {
    menuApi.show(state.plan.id).then((response) => {
      state.menu = response.data
    })
  }

  watch([() => state.year, () => state.week], () => {
    fetchPlan()
  })

  onMounted(fetchPlan)

  const savePlan = () => {
    return planApi
      .create({
        year: state.year,
        week: state.week,
        name: null,
      })
      .then(() => {
        fetchPlan()
      })
  }

  const create = (data) => {
    menuApi.create(data).then(() => {
      fetchMenu()
    })
  }

  const update = (data) => {
    menuApi.update(data.id, data.params).then(() => {
      fetchMenu()
    })
  }

  const remove = (menu_id) => {
    menuApi.remove(menu_id).then(() => {
      fetchMenu()
    })
  }

  return {
    state,
    create,
    update,
    remove,
  }
}
