import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import ContactView from '@/views/ContactView.vue';

describe('ContactView', () => {
  const wrapper = mount(ContactView)

  it('renders properly', () => {
    expect(wrapper.text()).toContain('Contact form')
  })

  it('renders the form', () => {
    expect(wrapper.find('form').text()).toContain('Name:')
    expect(wrapper.find('form').text()).toContain('Email:')
    expect(wrapper.find('form').text()).toContain('Message:')
  })

  it('has input fields with empty strings', () => {
    expect(wrapper.vm.inputName).to.equal('');
    expect(wrapper.vm.inputEmail).to.equal('');
    expect(wrapper.vm.inputMessage).to.equal('');
  })

  it('errorMsg and status is null', () => {
    expect(wrapper.vm.errorMsg).toBe('');
    expect(wrapper.vm.status).toBe(null);
  })

  
  it('isMounted is initialized as true', () => {
    expect(wrapper.vm.isMounted).to.be.true;
  })

  it('sets myStateVar to a new value', async () => {
    const wrapper = mount(ContactView);
    const name = 'Magnus';

    await wrapper.vm.$nextTick(); 

    wrapper.setData({ inputName: name });

    expect(wrapper.vm.inputName).toBe(name);
  })

  it('sets statevariables to a new values', async () => {
    const wrapper = mount(ContactView);
    const name = 'Surya';
    const email = 'sur@trondheim.go';
    const message = 'I love this calculator, the design is breathtaking';

    wrapper.setData({ inputName: name });
    wrapper.setData({ inputEmail: email });
    wrapper.setData({ inputMessage: message });

    await wrapper.vm.$nextTick(); 

    expect(wrapper.vm.inputName).toBe(name);
    expect(wrapper.vm.inputEmail).toBe(email);
    expect(wrapper.vm.inputMessage).toBe(message);
  })

  it('disables button if any input field is empty', () => {
    wrapper.vm.inputName = 'John';
    wrapper.vm.inputEmail = '';
    wrapper.vm.inputMessage = 'Hello world';
    wrapper.vm.evalInput();
    expect(wrapper.vm.isButtonDisabled).to.be.true;
    expect(wrapper.vm.errorMsg).to.equal('An input is empty');
  })

  it('disables button if email is not in the correct format', async () => {
    wrapper.vm.inputName = 'John';
    wrapper.vm.inputEmail = 'john@example';
    wrapper.vm.inputMessage = 'Hello world';
    await wrapper.vm.evalInput();
    expect(wrapper.vm.isButtonDisabled).to.be.true;
  })
})

