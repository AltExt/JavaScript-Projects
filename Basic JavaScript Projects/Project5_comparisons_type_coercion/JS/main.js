// using typeof
document.write("typeof: ")
document.write(typeof( typeof(true) ) + "<br>");

// type coercion
document.write("type coercion: ")
document.write("105" * 10 + "<br>");

// NaN
document.write("NaN: ")
document.write(0/0 + "<br>");

// isNaN true
document.write("isNaN true: ")
document.write(isNaN(0/0) + "<br>");

// isNaN false
document.write("isNaN false: ")
document.write(isNaN(100) + "<br>");

// infinity
document.write("infinity: ")
document.write(2E310 + "<br>");

// -infinity
document.write("-infinity: ")
document.write(-2E310 + "<br>");

// boolean true
document.write("boolean true: ")
var a = 10, b = 8;
document.write( (a > b) + "<br>");

// writing to console
console.log(a + b);

// boolean false
document.write("boolean false: ")
document.write( (b > a) + "<br>");

// equality operator
document.write("equality operator: ")
document.write( a == 10 + "<br>");
document.write( b == 10 + "<br>");

// strict equality operator
document.write("strict equality operator: ")
a = 10, b = 10, c = "10", d = "12";
document.write(a === b + "<br>");
document.write(a === d + "<br>");
document.write(a === c + "<br>");
document.write(c === d + "<br>");

// logical operators
document.write("logical operators: ")
document.write( a == b && typeof(a) == typeof(b)  + "<br>");
a = 5, b = 15;
document.write( a == b || typeof(a) == typeof(b)  + "<br>");
document.write( !(a == b) && typeof(a) == typeof(b)  + "<br>");
document.write( a == b || typeof(a) != typeof(b)  + "<br>");