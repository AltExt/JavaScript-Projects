function DictionaryParagraphCLicked() {
    var KVP = {
        firstName:"Eoghan",
        lastName:"Biggane",
        age:26,
    }
    delete KVP.age;
    document.getElementById("dictionary").innerHTML = KVP.age;
}