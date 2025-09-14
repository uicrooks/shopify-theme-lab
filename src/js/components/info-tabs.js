class InfoTabs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.navgationItems = this.querySelectorAll('.tabs-navigation__item');
    this.tabWrappers = this.querySelectorAll('.tab-wrapper');

    this.handleClick = this.handleClick.bind(this);

    this.navgationItems.forEach(item => {
      item.addEventListener('click', this.handleClick);
    });
  }

  handleClick(event) {
    this.navgationItems.forEach(item => {
      item.removeAttribute('open');
    });
    this.tabWrappers.forEach(wrapper => {
      wrapper.removeAttribute('open');
    });

    const target = event.target;
    const tabHeading = target.getAttribute('data-tab-heading');

    target.setAttribute('open', '');
    this.tabWrappers.forEach(wrapper => {
      if (wrapper.getAttribute('data-tab-heading') === tabHeading) {
        wrapper.setAttribute('open', '');
      }
    });
  }
}

customElements.define('info-tabs', InfoTabs);