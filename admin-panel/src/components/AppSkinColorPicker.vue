<template>
    <div class="app-color-skin" :style="'justify-content:'+align+';'">
      <div class="color-picker-item"  :key="color.name+'_'+index" v-for="(color,index) in colors">
        <input :checked="color.name==modelValue" type="radio"  :value="color.name" :name="name" :id="name+'-'+id+'-'+index" @input="updateValue"  />
        <label :for="name+'-'+id+'-'+index" :title="color?.title" :style="'background:'+color?.color" >

            <svg class="check-svg"   xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 100 100" xml:space="preserve">
                <g>
                <path fill="currentColor" d="M45.459 77.819l44.795-44.794A7.668 7.668 0 1 0 79.409 22.18L40.037 61.553 20.591 42.107A7.668 7.668 0 1 0 9.746 52.952L34.614 77.82a7.647 7.647 0 0 0 5.422 2.246 7.653 7.653 0 0 0 5.423-2.247z" />
                </g>
            </svg>

        </label>
      </div>


    </div>
</template>

<script>
let uid=0;
export default {
name: "AppSkinColorPicker",
  inheritAttrs: false,
  props:{
    align:{
      type:String,
      default:'left'
    },
    modelValue: '',
    name:{
      type:String,
      default: "color"
    },
    colors:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      id: ''
    }
  },
  created () {
    this.id =uid++;
  },

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('change', event.target.value);
    }
  }
}
</script>

<style scoped lang="scss">
.app-color-skin {
  display: flex;


  .color-picker-item {

    input[type=radio]{
      position: absolute;
      visibility: hidden;
      &:checked+label{
        >svg{
          height: 1em;
          font-size: 1.2em;
          display: block;
          color: rgba(255, 255, 255, 0.65);

        }
      }
    }
    > label{
      position: relative;
      width: 33px;
      height: 33px;
      display: inline-flex;
      border: 1px solid transparent;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border: 1px solid transparent;
      border-radius: 50%;
      box-shadow: 0 0 8px -2px rgba(0, 0, 0, 0.21);
      >svg{
        display: none;
      }
      cursor: pointer;

    }
    @media only screen and (max-width: 600px) {
      > label{
        width: 25px;
        height: 25px;
      }
    }
    +.color-picker-item{
      margin-left: 5px;
    }
  }
}
</style>