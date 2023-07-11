export default {
  formatNumberToPrice(value = "", fixed = 2){
    let _value = value.toString().replaceAll(',','');
    let price;
    
    if (isNaN(_value) || !_value) { 
        return null
    }

    price = parseFloat(_value).toFixed(fixed)
    price =  `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    return price
  }
}