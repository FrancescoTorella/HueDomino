Vue.component('custom-div', {
    props: ['id'],
    created: function() {
        console.log(this.id);
    },
    template: `
      <div :id="id +'Outer'" class="outer-container">
        <div :id="id +'Middle'" class="middle-container">
          
        </div>
        <div :id="id +'Inner'" class="inner-container">
            <slot></slot>
        </div>
      </div>
    `,
});

new Vue({ el: '#app' });