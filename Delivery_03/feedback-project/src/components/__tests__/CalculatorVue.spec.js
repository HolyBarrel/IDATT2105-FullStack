import { test, describe, it, expect, vi } from 'vitest'


import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import Calculator from '@/components/CalculatorVue.vue';


describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})

describe('Calculator', () => {

  const wrapper = mount(Calculator)

  it('calc header renders properly', () => {
    expect(wrapper.find('#headerCalc').text()).toContain('CALCULATOR 3000')
  })

  it('error display renders properly', () => {
    const errorMessage = 'Error message';
    wrapper.vm.$el.innerHTML = errorMessage;
    expect(wrapper.html()).toContain(errorMessage);
  })

  it('renders a calculator with numbers and operations', () => {
    const wrapper = mount(Calculator)
    const buttons = wrapper.findAll('.action_btn')
    expect(buttons).toHaveLength(20)

    const numberButtons = buttons.filter((button) => !isNaN(parseInt(button.text())))
    expect(numberButtons).toHaveLength(10)

    const operationButtons = buttons.filter((button) => ['+', '-', '*', '/'].includes(button.text()))
    expect(operationButtons).toHaveLength(4)
  })

  it('updates the first number when the button 1 is clicked', () => {
    const wrapper = shallowMount(Calculator);
    const button = wrapper.find('#btn1');
    button.trigger('click');
    expect(wrapper.vm.currentFirstNum).toBe('1');
  });


  it('updates the first number when clicked repeatedly', () => {
    const wrapper = shallowMount(Calculator);

    const buttons = wrapper.findAll('.action_btn')
    buttons[4].trigger('click');
    buttons[4].trigger('click');
    buttons[4].trigger('click');
    buttons[4].trigger('click');

    expect(wrapper.vm.currentFirstNum).toBe('1111');

  });

  it('updates the currentOperator', () => {
    const wrapper = shallowMount(Calculator);

    const buttons = wrapper.findAll('.action_btn')
    buttons[4].trigger('click');
    buttons[3].trigger('click');

    expect(wrapper.vm.currentOperator).toBe('+');

    buttons[7].trigger('click');

    expect(wrapper.vm.currentOperator).toBe('-');
  });

  it('updates the second number', () => {
    const wrapper = shallowMount(Calculator);

    const buttons = wrapper.findAll('.action_btn')
    buttons[4].trigger('click');
    buttons[4].trigger('click'); //fn: 11

    buttons[3].trigger('click'); //+

    expect(wrapper.vm.currentOperator).toBe('+');

    buttons[5].trigger('click');
    buttons[5].trigger('click'); //sn: 22

    expect(wrapper.vm.currentSecondNum).toBe('22');
  });

  /*
  it('updates the answer', async () => {
    const wrapper = mount(Calculator);
    const buttons = wrapper.findAll('.action_btn')
    await wrapper.vm.$nextTick(); // Wait for the component to finish updating
  
    wrapper.setData({ currentFirstNum: '11', currentSecondNum: '22', currentOperator: '+' });

    await buttons[19].trigger('click');
    await wrapper.vm.$nextTick(); // Wait for the component to finish updating
  
    expect(wrapper.vm.prevAnswer).toBe('33');
  });
  */
  /*
  TESTING THESE BUTTONS: 
  INDEX -> SYMBOL
  0 -> 'C'
  1 -> 'ANS'
  2 -> 'DEL'
  3 -> '+'
  4 -> '1'
  5 -> '2'
  6 -> '3'
  7 -> '-'
  8 -> '4'
  9 -> '5'
  10 -> '6'
  11 -> '*'
  12 -> '7'
  13 -> '8'
  14 -> '9'
  15 -> '/'
  16 -> ' '
  17 -> '0'
  18 -> '.'
  19 -> '='

  */



})


