var CommonManager = {
  random: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive.
  },

  maxInAssocArray: function(arr) {
    // Finds the max index and value from an associative array.
    var index = 0;
    var max = null;

    for (var i=0; i<Object.keys(arr).length; i++) {
      var key = Object.keys(arr)[i];
      var value = arr[key];

      if (!max || value > max) {
        max = value;
        index = i;
      }
    }

    return { index: index, value: max };
  }
};

module.exports = CommonManager;