import Vue from 'vue';


Vue.filter('toDateTime', timestamp => {
    return new Date(timestamp).toLocaleString();
});

Vue.filter('toLocaleDate', timestamp => {
    var date = new Date(timestamp)
    return  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDate()
});

Vue.filter('toDouble', value => {
    return  value / 100;
});


Vue.filter('toMoney', value => {
    if (isNaN(value)) return "NaN"
    let val = (value/1).toFixed(2).replace(',', '.')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
});


Vue.filter('toWhole', value => {
    if (isNaN(value)) return "NaN"
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
});

export default Vue