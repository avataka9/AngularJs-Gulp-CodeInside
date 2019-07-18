//TODO make this component better and more beautiful

angular.
  module('studentsRatings').
  component('studentsRatings', {
    templateUrl: 'components/studentsRatings/studentsRatings.template.html',
    controller: ['$http', function StudentsRatingsCtrl($http) {
      let self = this;

      self.info = {
        numberRatings: 0,
        fillingMode: 'manual',
        ratings: [],
        fillingPosition: 0,
      };

      self.createArray = function () {
        self.info.ratings.length = self.info.numberRatings
      };

      self.showRatings = function() {
        if ((self.info.ratings.length > 0) && (Array.isArray(self.info.ratings))) {
          return true
        }
      };

      self.showAutofiller = function() {
        if (self.info.fillingMode === 'auto') {
          return true
        }
      };

      self.fillingStarted = function() {
        for (let i = 0; i < self.info.ratings.length; ++i) {
          if (self.info.ratings[i] == null) {
            self.info.fillingPosition = i;
            break;
          }
        }

        return !(self.info.ratings.join('') === '')
      };

      self.reset = function() {
        self.info.ratings.length = 0
      };

      self.nextFillingPosition = function() {
        if (self.info.fillingPosition < self.info.ratings.length) {
          self.info.fillingPosition += 1
        }
      }

    }]
  });