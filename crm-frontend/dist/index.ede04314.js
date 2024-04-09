const table = document.querySelector(".table__body");
const timeout = function(sec) {
    return new Promis(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too  long! Timeout afer ${sec} seconds`), sec * 1000);
        });
    });
};

//# sourceMappingURL=index.ede04314.js.map
