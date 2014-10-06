var mispar = (function() {
    var dictionary = {
        "1": {
            "female": { hebrew: "אחת", translit: "ахат" },
            "male":   { hebrew: "אחד", translit: "эхад" }
        },
        "2": {
            "female": { hebrew: "שתיים", translit: "штаим" },
            "male":   { hebrew: "שניים", translit: "шнаим" }
        },
        "3": {
            "female": { hebrew: "שלוש", translit: "шалош" },
            "male":   { hebrew: "שלושה", translit: "шлоша" }
        },
        "4": {
            "female": { hebrew: "ארבע", translit: "арба" },
            "male":   { hebrew: "ארבעה", translit: "арбаа" }
        },
        "5": {
            "female": { hebrew: "חמש", translit: "хамеш" },
            "male":   { hebrew: "חמישה", translit: "хамиша" }
        },
        "6": {
            "female": { hebrew: "שש", translit: "шеш" },
            "male":   { hebrew: "שישה", translit: "шиша" }
        },
        "7": {
            "female": { hebrew: "שבע", translit: "шева" },
            "male":   { hebrew: "שבעה", translit: "шивъа" }
        },
        "8": {
            "female": { hebrew: "שמונה", translit: "шмонэ" },
            "male":   { hebrew: "שמונה", translit: "шмона" }
        },
        "9": {
            "female": { hebrew: "תשע", translit: "тэша" },
            "male":   { hebrew: "תשעה", translit: "тишъа" }
        },
        "10+": {
            "female": { hebrew: "-עשרה", translit: "-эсрэ" },
            "male":   { hebrew: "-עשר", translit: "-асар" }
        },
        "10": {
            "female": { hebrew: "עשר", translit: "эсер" },
            "male":   { hebrew: "עשרה", translit: "асара" }
        },
        "12": {
            "female": { hebrew: "שתים", translit: "штэм" },
            "male":   { hebrew: "שנים", translit: "шнэм" }
        },
        "13": {
            "female": { hebrew: "שלוש", translit: "шлош" },
            "male":   { hebrew: "שלושה", translit: "шлоша" }
        },
        "17": {
            "female": { hebrew: "שבע", translit: "шва" },
            "male":   { hebrew: "שבעה", translit: "шивъа" }
        },
        "19": {
            "female": { hebrew: "תשע", translit: "тша" },
            "male":   { hebrew: "תשעה", translit: "тишъа" }
        },
        "20": { hebrew: "", translit: "эсрим" },
        "30": { hebrew: "", translit: "шлошим" },
        "40": { hebrew: "", translit: "арбаим" },
        "50": { hebrew: "", translit: "хамишим" },
        "60": { hebrew: "", translit: "шишим" },
        "70": { hebrew: "", translit: "шивъим" },
        "80": { hebrew: "", translit: "шмоним" },
        "90": { hebrew: "", translit: "тишъим" },
        "100": { hebrew: "", translit: "меа" }
    };

    return function (number, isMale) {
        var gender = isMale ? 'male' : 'female';
        number = (+number);

        if (number <= 10) {
            return dictionary[""+number][gender];
        }

        if (number <= 19) {
            if ([12, 13, 17, 19].indexOf(number) === -1) {
                number = number % 10;
            }

            var part1 = dictionary[""+ number][gender];
            var part2 = dictionary["10+"][gender];

            return {
                hebrew: part1.hebrew + part2.hebrew,
                translit: part1.translit + part2.translit
            };
        }

        if (number % 10 === 0) {
            return dictionary["" + number];
        }
    };
}());

var i, m;

console.log("Числа (мужской род):")
for (i = 1; i <= 19; i++) {
    m = mispar(i, true);
    console.log(i, m.translit, m.hebrew);
}

console.log("Числа (женский род):")
for (i = 1; i <= 19; i++) {
    m = mispar(i, false);
    console.log(i, m.translit, m.hebrew);
}
