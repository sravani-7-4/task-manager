

module.exports.getDate = function (){
    var options = { weekday: 'long', day: 'numeric', month: 'long'};
    const today = new Date();
    return today.toLocaleDateString("en-US",options) ; 
};


exports.getDay = day;

function day(){
    let options = {
        weekday:"long"
    };
    const today = new Date();
    let day = today.toLocaleDateString("en-US",options);
    // console.log(day);
    return day;
}

// console.log(module.exports);