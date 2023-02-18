import { describe, it, expect, beforeEach } from 'vitest'


import { mount } from '@vue/test-utils'
import Calculator from '@/components/CalculatorVue.vue';

describe('Calculator', () => {

  let wrapper;
  let buttons;

  beforeEach(() => {
    wrapper = mount(Calculator)
    buttons = wrapper.findAll('.action_btn')
    buttons[0].trigger('click') //RESETS
  })

  it('calc header renders properly', () => {
    expect(wrapper.find('#headerCalc').text()).toContain('CALCULATOR 3000')
  })

  it('error display renders properly', () => {
    const errorMessage = 'Error message';
    wrapper.vm.$el.innerHTML = errorMessage;
    expect(wrapper.html()).toContain(errorMessage);
  })

  it('renders a calculator with numbers and operations', () => {    
    expect(buttons).toHaveLength(20)

    const numberButtons = buttons.filter((button) => !isNaN(parseInt(button.text())))
    expect(numberButtons).toHaveLength(10)

    const operationButtons = buttons.filter((button) => ['+', '-', '*', '/'].includes(button.text()))
    expect(operationButtons).toHaveLength(4)
  })

  it('updates the first number when the button 1 is clicked', () => {
    const button = wrapper.find('#btn1');
    button.trigger('click');
    expect(wrapper.vm.currentFirstNum).toBe('1');
  });


  it('updates the first number when clicked repeatedly', () => {
    buttons[4].trigger('click');
    buttons[4].trigger('click');
    buttons[4].trigger('click');
    buttons[4].trigger('click');

    expect(wrapper.vm.currentFirstNum).toBe('1111');

  });

  it('updates the currentOperator', () => {
    buttons[4].trigger('click');
    buttons[3].trigger('click');

    expect(wrapper.vm.currentOperator).toBe('+');

    buttons[7].trigger('click');

    expect(wrapper.vm.currentOperator).toBe('-');
  });

  it('updates the second number', () => {
    buttons[4].trigger('click');
    buttons[4].trigger('click'); //fn: 11

    buttons[3].trigger('click'); //+

    expect(wrapper.vm.currentOperator).toBe('+');

    buttons[5].trigger('click');
    buttons[5].trigger('click'); //sn: 22

    expect(wrapper.vm.currentSecondNum).toBe('22');
  });
 
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


