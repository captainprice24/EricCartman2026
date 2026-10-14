/*
 * Question bank registry. Loaded before any question set file.
 * Every set file calls EPSO_BANK.registerSet({...}). See docs/QUESTION_FORMAT.md.
 */
(function () {
  var bank = window.EPSO_BANK || { sets: [] };
  bank.registerSet = function (set) {
    bank.sets.push(set);
  };
  window.EPSO_BANK = bank;
})();
