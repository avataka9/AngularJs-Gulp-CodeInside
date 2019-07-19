angular.module('studentsRatings').component('studentsRatings', {
	templateUrl: 'components/studentsRatings/studentsRatings.template.html',
	controller: ['$http', function StudentsRatingsCtrl($http) {
		let self = this;
		
		self.info = {
			quantityRatings: 0,
			fillingMode: 'manual',
			ratings: [],
			fillingPosition: 0,
			totalLessons: 0,
			skippedLessons: 0,
			skippedWithoutReason: 0,
			checkError: [],
			decision: 'Wait here for decision. It will be right here.',
			finished: false
		};
		
		self.createArray = function () {
			self.info.ratings.length = self.info.quantityRatings
		};
		
		self.fillingStarted = function () {
			for (let i = 0; i <= self.info.ratings.length; ++i) {
				if (self.info.ratings[i] === undefined) {
					self.info.fillingPosition = i;
					break;
				}
			}
			return !(self.info.ratings.join('') === '')
		};
		
		self.nextFillingPosition = function () {
			if (self.info.fillingPosition <= self.info.ratings.length) {
				self.info.fillingPosition += 1
			}
		};
		
		self.isSubjectFilled = function () {
			if ((typeof self.info.subject === 'string') && (self.info.subject.trim() !== '')) {
				return true
			}
		};
		
		
		self.showRatings = function () {
			if ((self.info.ratings.length > 0) && (Array.isArray(self.info.ratings))) {
				return true
			}
		};
		
		self.showAutofiller = function () {
			if (self.info.fillingMode === 'auto') {
				return true
			}
		};
		
		self.showSkips = function () {
			if ((self.info.fillingPosition === self.info.ratings.length) && self.fillingStarted()) {
				return true
			}
		};
		
		
		self.reset = function () {
			self.info.ratings.length = 0;
			self.info.decision = 'Wait here for decision. It will be right here.';
			self.info.finished = false;
		};
		
		self.check = function () {
			if (!self.isSubjectFilled()) {
				self.info.decision = 'Too early.';
				return;
			}
			
			if ((self.info.ratings.length <= 0)) {
				self.info.decision = 'Too early.';
				return;
			}
			
			if ((self.info.fillingPosition !== self.info.ratings.length)) {
				self.info.decision = 'Too early.';
				return;
			}
			
			if ((self.info.totalLessons === 0)) {
				self.info.decision = 'Too early.';
				return;
			}
			
			self.info.finished = true;
			
			if (self.info.skippedLessons > (self.info.totalLessons * 50 / 100)) {
				self.info.decision = 'You skip too much, prepare to test.';
				return;
			}
			
			if (self.info.skippedWithoutReason > (self.info.skippedLessons * 20 / 100)) {
				self.info.decision = 'You skip too much without reason, prepare to test.';
				return;
			}
			
			let total = self.info.ratings.reduce(function (sum, current) {
				return sum + current;
			}, 0);
			
			if ((total / self.info.ratings.length) < 4) {
				self.info.decision = 'You need to study better, prepare to test.';
				return;
			}
			
			self.info.decision = 'Congratulation! You pass the test!';
		};
		
		
		self.send = function () {
			data = {
				subject: self.info.subject,
				ratings: self.info.ratings,
				totalLessons: self.info.totalLessons,
				skippedLessons: self.info.skippedLessons,
				skippedWithoutReason: self.info.skippedWithoutReason,
				decision: self.info.decision
			};
			
			fetch('http://localhost:8080', {
				method: 'post',
				body: JSON.stringify(data),
				headers: {'content-type': 'application/json'}
			}).then(function (response) {
				self.info.serverAnswer = response;
				return response;
			}).then(function (response) {
				alert(response.status);
				return response.json();
			})
		}
		
	}]
});