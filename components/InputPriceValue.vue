<template>
  <div class="input-price-value-component">
    <div :class="{ 'has-symbol': !noSymbol }" class="content">
      <!-- <span class="price-symbol">&#8369;</span> -->
      <v-text-field
        :label="priceLabel"
        size="small"
        type="text"
        v-model="myPrice"
        :id="`my-input-${myId}`"
        @blur="onBlurPrice()"
        class="price-value-input"
        :class="{ 'input-right': alignRight }"
        @click.native="onFocus($event)"
        outlined
        dense
        :prefix="symbol"
        hide-details
        @change="onValueChange"
      />
      <span v-if="!noUnit" class="price-divider">/</span>
      <v-text-field
        size="small"
        type="text"
        v-if="!noUnit"
        v-model="myUnit"
        class="unit-value-input"
        @on-change="unitChange()"
        @click.native="onFocus($event)"
        outlined
        dense
        hide-details
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "0",
    },
    noSymbol: {
      type: Boolean,
      default: false,
    },
    symbol: {
      type: String,
      default: "$",
    },
    noUnit: {
      type: Boolean,
      default: true,
    },
    unit: {
      type: String,
      default: "pc",
    },
    priceLabel: {
      type: String,
      default: "",
    },
    alignRight: Boolean,
  },
  data() {
    let _value, _valueNoComma;
    if (this.value) _valueNoComma = this.value.toString().replaceAll(",", "");

    if (isNaN(_valueNoComma) || !_valueNoComma) {
      _value = (0).toFixed(0);
    } else {
      _value = parseFloat(_valueNoComma).toFixed(0);
    }
    return {
      myPrice: _value,
      myUnit: this.unit,
      myId: Math.floor(Math.random() * 999),
      // TODO: window.generateUUID()
    };
  },
  mounted() {
    this.onBlurPrice();
    this.$nextTick(() => {
      var input = document.querySelector(`#my-input-${this.myId}`);
      input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9.\,]/, "");
      });
    });
  },
  methods: {
    onFocus(e) {
      if (!e) return;

      let el = e.srcElement;
      if (el && el.value) {
        el.setSelectionRange(0, el.value.length);
      }
    },
    onBlurPrice() {
      let _myPrice = this.myPrice.replaceAll(",", "");
      if (isNaN(_myPrice) || !_myPrice) {
        _myPrice = 0;
      }
      this.myPrice = parseFloat(_myPrice).toFixed(0);
      this.myPrice = `${this.myPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$emit("blur-price", this.myPrice.replaceAll(",", ""));
    },
    unitChange() {
      this.$emit("unit-change", this.myUnit);
    },

    onValueChange(val){
      this.$emit("onValueChange", val)
    }
  },
  watch: {
    myPrice() {
      let _myPrice = this.myPrice.replaceAll(",", "");
      if (isNaN(_myPrice) || !_myPrice) {
        _myPrice = 0;
      }
      _myPrice = parseFloat(_myPrice).toFixed(0);
      this.$emit("blur-price", _myPrice.replaceAll(",", ""));
    },
  },
};
</script>

<style lang="scss">
.input-price-value-component {
  height: 100%;
  // width: 100%;
  .content {
    display: flex;
    margin: 0px;
    align-items: center;
    position: relative;
  }
  // .has-symbol {
  //   .price-symbol {
  //     position: absolute;
  //     z-index: 1;
  //     left: 4px;
  //     margin-bottom: 6px;
  //   }
  //   .price-value-input {
  //     input {
  //       padding-left: 16px;
  //     }
  //   }
  // }
  .input-right {
    input {
      text-align: right;
    }
  }
  .unit-value-input {
    width: fit-content;
    input {
      width: 45px;
    }
  }
  .price-divider {
    padding: 0 4px;
    font-size: 20px;
  }
  .price-value-input {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
}
</style>