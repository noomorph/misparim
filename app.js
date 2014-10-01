(function () {
    function LetterViewModel(index, click) {
        this.index = index;
        this.letter = ko.observable('');
        this.used = ko.observable(false);
        this.isBackSpace = ko.observable(false);
        this.isEnter = ko.observable(false);

        this.isHidden = ko.computed(function () {
            if (this.isBackSpace() || this.isEnter()) {
                return false;
            }

            return !this.letter() || this.used();
        }, this);

        this.click = click.bind(this);
    }

    LetterViewModel.prototype.enter = function (click) {
        this.letter = '_|';
        this.isEnter(true);
        return this;
    };

    LetterViewModel.prototype.backspace = function (click) {
        this.letter = '<';
        this.isBackSpace(true);
        return this;
    };

    function GameViewModel() {
        var self = this;

        function letterClick() {
            if (!this.used()) {
                this.used(true);
                self.currentWord().enteredLetters.push(this);
            }

            return false;
        }

        this.currentWord = ko.observable({
            number: 3,
            male: true,
            image: 'url(data/images/robots.jpg)',
            word: '\u05E9\u05DC\u05D5\u05E9\u05D4',
            hint: '\u05E8\u05D5\u05D1\u05D5\u05D8\u05D9\u05DD',
            right: ko.observable(),
            keyboardLetters: ko.observable([
                new LetterViewModel(1, letterClick),
                new LetterViewModel(2, letterClick),
                new LetterViewModel(3, letterClick),
                new LetterViewModel(4, letterClick),
                new LetterViewModel(5, letterClick),
                new LetterViewModel(6, letterClick),
                new LetterViewModel(7, letterClick),
                new LetterViewModel(8, letterClick),
                new LetterViewModel(9, letterClick),
                new LetterViewModel(10, letterClick),
                new LetterViewModel(11, letterClick),
                new LetterViewModel(12, function () {
                    var word = self.currentWord();
                    var kb = word.keyboardLetters();
                    var letter = word.enteredLetters.pop();

                    if (letter) {
                        letter.used(false);
                    }

                    return false;
                }).backspace(),
                new LetterViewModel(13, letterClick),
                new LetterViewModel(14, letterClick),
                new LetterViewModel(15, letterClick),
                new LetterViewModel(16, function () {
                    return false;
                }).enter()
            ]),
            enteredLetters: ko.observableArray([]),
        });

        var word = this.currentWord();
        var letters = word.keyboardLetters();
        word.word.split('').reverse().forEach(function (letter, index) {
            letters[index].letter(letter);
        });

        word.enteredText = ko.computed(function () {
            return this().map(function (word) {
                return word.letter();
            }).join('');
        }, word.enteredLetters);
    }

    var game = window.game = new GameViewModel();
    ko.applyBindings(game);
}());
