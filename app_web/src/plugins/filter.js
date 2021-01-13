import Vue from 'vue';


Vue.filter('toDateTime', timestamp => {
    return new Date(timestamp).toLocaleString();
});

Vue.filter('toLocaleDate', timestamp => {
    var date = new Date(timestamp)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
});

Vue.filter('toDouble', value => {
    return value / 100;
});


Vue.filter('toRoundOff4', value => {
    if (isNaN(value)) return "NaN"
    const options = {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    };
    var formatted = Number(value).toLocaleString('en', options);
    return formatted
});


Vue.filter('toRoundOff2', value => {
        if (isNaN(value)) return "NaN"
        const options = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        var formatted = Number(value).toLocaleString('en', options);
        return formatted
});


Vue.filter('toWhole', value => {
    if (isNaN(value)) return "NaN"
  
    return Math.ceil(value)
});

export default Vue