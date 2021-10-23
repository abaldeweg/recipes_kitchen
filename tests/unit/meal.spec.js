import { mount, createLocalVue } from '@vue/test-utils'
import Meal from './../../src/components/menu/Meal'
import VueCompositionApi from '@vue/composition-api'
import components from '@baldeweg/components'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)
localVue.use(components)

describe('Meal', () => {
  it('renders the select', () => {
    const $t = () => {}
    const wrapper = mount(Meal, {
      localVue,
      propsData: {},
      mocks: {
        $t,
      },
    })

    expect(wrapper.find('select').exists()).toBeTruthy()
  })
})
