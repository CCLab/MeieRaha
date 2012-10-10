var rules = [
{ target: 58, destination: 167, coef: 20.0/33, message: "Sotsiaalmaksust läheb 60% pensionidele," },
{ target: 58, destination: 150, coef: 13.0/33, message: "ning 40% - haigekassasse." },
{ target: 167, destination: 58, coef: 1.0, message: "Pensionid on finantseeritavad sotsiaalmaksust" },
{ target: 150, destination: 58, coef: 1.0, message: "Haigekassa on finantseeritud sotsiaalmaksust" },
{ target: 62, destination: 140, coef: 3.0/4, message: "75% kütuseaktsiisist läheb teede ehitusele" },
{ target: 60, destination: 153, coef: 35.0/1000, message: "3.5% alkoholi läheb kultuuri toetuseks" },
{ target: 61, destination: 153, coef: 35.0/1000, message: "3.5% tubakaaktsiisist läheb kultuuri toetuseks" },
{ target: 65, destination: 152, coef: 83.0/100, message: "83% hasartmängumaksust läheb kultuuri ja spordi toetuseks" }
];

